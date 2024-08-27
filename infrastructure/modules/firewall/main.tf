terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

resource "aws_wafv2_web_acl" "waf_acl" {
  name        = "${var.waf_name}${local.workspace_suffix}"
  description = "CM Frontend WAF"
  scope       = "CLOUDFRONT"

  default_action {
    allow {}
  }

  # Primary Web ACL metric
  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${var.waf_acl_metric_name}${local.workspace_suffix}"
    sampled_requests_enabled   = true
  }

  rule {
    name     = "${var.waf_reputation_rule_name}${local.workspace_suffix}"
    priority = 30

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesAmazonIpReputationList"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.ip_reputation_list_metric_name}${local.workspace_suffix}"
      sampled_requests_enabled   = true
    }
  }

  # Service-team specific rules
  rule {
    name     = "${var.non_gb_rule_metric_name}${local.workspace_suffix}"
    priority = 1
    action {
      count {}
    }
    statement {
      not_statement {
        statement {
          geo_match_statement {
            country_codes = ["GB"]
          }
        }
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.non_gb_rule_metric_name}${local.workspace_suffix}"
      sampled_requests_enabled   = true
    }
  }
  rule {
    name     = "${var.custom_rate_limited_rule_name}${local.workspace_suffix}"
    priority = 2
    action {
      block {}
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.custom_rate_limited_metric_name}${local.workspace_suffix}"
      sampled_requests_enabled   = true
    }
    statement {
      rate_based_statement {
        limit              = var.rate_based_limit
        aggregate_key_type = "IP"
      }
    }
  }

}

resource "aws_cloudwatch_log_group" "waf_logs" {
  count = var.generate_waf_logs ? 1 : 0
  // Note CW log group name should begin aws-waf-logs
  name = var.waf_log_group_name
}

resource "aws_wafv2_web_acl_logging_configuration" "waf_acl_lc" {
  count = var.generate_waf_logs ? 1 : 0

  log_destination_configs = [aws_cloudwatch_log_group.waf_logs[0].arn]
  resource_arn            = aws_wafv2_web_acl.waf_acl.arn
}

#
#  Cloudwatch dashboards

resource "aws_cloudwatch_dashboard" "wafv2_dashboard" {
  dashboard_name = "${var.waf_dashboard_name}${local.workspace_suffix}"
  dashboard_body = <<EOF
    {
      "widgets": [
        {
            "height": 6,
            "width": 24,
            "y": 0,
            "x": 0,
            "type": "log",
            "properties": {
                "query": "SOURCE '${var.waf_log_group_name}' | fields httpRequest.uri, action, nonTerminatingMatchingRules.0.action, nonTerminatingMatchingRules.0.ruleId, ruleGroupList.0.excludedRules.0.exclusionType,ruleGroupList.0.excludedRules.0.ruleId | stats count(*) as requestCount by httpRequest.uri, action, nonTerminatingMatchingRules.0.action, nonTerminatingMatchingRules.0.ruleId,ruleGroupList.0.excludedRules.0.exclusionType,ruleGroupList.0.excludedRules.0.ruleId",
                "region": "${var.aws_waf_region}",
                "stacked": false,
                "title": "Log group: ${var.waf_log_group_name}",
                "view": "table"
            }
        },
        {
            "height": 6,
            "width": 6,
            "y": 6,
            "x": 0,
            "type": "metric",
            "properties": {
                "metrics": [
                    [ "AWS/WAFV2", "CountedRequests", "WebACL", "${var.waf_name}", "Region", "${var.aws_waf_region}", "Rule", "CrossSiteScripting_BODY" ],
                    [ "...", "${var.non_gb_rule_metric_name}" ],
                    [ "...", "${var.ip_reputation_list_metric_name}" ],
                    [ ".", "AllowedRequests", ".", ".", ".", ".", ".", "ALL" ]
                ],
                "view": "timeSeries",
                "stacked": false,
                "region": "${var.aws_waf_region}",
                "period": 10,
                "setPeriodToTimeRange": true,
                "stat": "Minimum"
            }
        }
      ]
    }
  EOF
}


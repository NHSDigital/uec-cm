# None
front-end-s3-bucket-name = "front-end"

website_map = {
  index_document = "index.html"
  error_document = "index.html"
}

# waf
waf_dashboard_name              = "wafv2-dashboard"
waf_log_group_name              = "aws-waf-logs"
non_gb_rule_metric_name         = "waf-non-GB-geo-match-metric"
ip_reputation_list_metric_name  = "waf-aws-ip-reputation-list-metric"
generate_waf_logs               = false
aws_waf_region                  = "us-east-1"
aws_ip_reputation_rule_name     = "aws-ip-reputation-list"
acl_metric_name                 = "waf-acl-metric"
custom_rate_limited_rule_name   = "custom-rate-limit-rule"
custom_rate_limited_metric_name = "custom-rate-limit-metric"


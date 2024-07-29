# None
front-end-s3-bucket-name = "front-end"

website_map = {
  index_document = "index.html"
  error_document = "index.html"
}

# WAF-related
waf_name                       = "waf-acl"
waf_dashboard_name             = "wafv2-dashboard"
waf_log_group_name             = "aws-waf-logs"
non_gb_rule_metric_name        = "waf-non-GB-geo-match-metric"
ip_reputation_list_metric_name = "waf-aws-ip-reputation-list-metric"
generate_waf_logs              = false

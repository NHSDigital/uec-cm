# Waf related
variable "waf_dashboard_name" {
  description = "Name of cloudwatch dashboard for wafv2"
}

variable "waf_name" {
  description = "Name of the WAF ACL"
}

variable "waf_log_group_name" {
  description = "Name of the cloudwatch log group generated for WAF ACL"
}

variable "non_gb_rule_metric_name" {
  description = "Name of metric for the non gp geo rule"
}

variable "ip_reputation_list_metric_name" {
  description = "Name of metric for ip reputation list rule"
}

variable "generate_waf_logs" {
  description = "Boolean value to determine whether or not we generate WAF logging"
  default     = false
}

variable "waf_reputation_rule_name" {
  description = "Reputation rule name "
}

variable "waf_acl_metric_name" {
  description = "Name of primary web acl metric"
}

variable "aws_waf_region" {
  description = "AWS region used for cloudfront wafv2 - eg us-east-1"
}

variable "custom_rate_limited_rule_name" {
  description = "Name of custom limiting rule"
}

variable "custom_rate_limited_metric_name" {
  description = "Name of metric for customised rate limiting rule"
}

variable "rate_based_limit" {
  description = "Threshold for rate based rule"
}

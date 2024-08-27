variable "front-end-s3-bucket-name" {
  description = "CM Front End"
}

variable "website_map" {
  description = "Map of static website hosting"
}

variable "force_destroy" {
  description = "Whether to forcefully destroy the bucket when it contains objects"
  type        = bool
  default     = true
}

# waf
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
}

variable "aws_ip_reputation_rule_name" {
  description = "Name of aws managed ip reputation rule"
}

variable "acl_metric_name" {
  description = "Name of metric"
}

variable "custom_rate_limited_rule_name" {
  description = "Name of custom limiting rule"
}

variable "custom_rate_limited_metric_name" {
  description = "Name of metric for customised rate limiting rule"
}

variable "rate_based_limit" {
  description = "The number of requests per 5 min that will trigger rule to block requests"
}

variable "aws_waf_region" {
  description = "The aws region for wafv2 dashboard"
}


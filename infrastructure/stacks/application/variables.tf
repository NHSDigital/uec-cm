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


output "waf_acl_arn" {
  description = "The ARN of the WAFv2"
  value       = aws_wafv2_web_acl.waf_acl.arn
}




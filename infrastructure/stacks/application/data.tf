# Look up waf
data "aws_wafv2_web_acl" "waf_acl" {
  name  = "${var.project}-waf-acl"
  scope = "CLOUDFRONT"
}


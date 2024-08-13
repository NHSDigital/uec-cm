# Look up waf using alternative provider linked
# to us-east-1 - the global region for wafv2s

data "aws_wafv2_web_acl" "waf_acl" {
  name     = "${var.project}-waf-acl"
  scope    = "CLOUDFRONT"
  provider = aws.provider-us-east-1
}


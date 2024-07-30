# Look up waf
provider "us-east-1" {
  alias                       = "us1"
  region                      = "us-east-1"
  skip_metadata_api_check     = true
  skip_region_validation      = true
  skip_credentials_validation = true
  skip_requesting_account_id  = false

}
provider "eu-west-2" {
  alias                       = "eu"
  region                      = "eu-west-2"
  skip_metadata_api_check     = true
  skip_region_validation      = true
  skip_credentials_validation = true
  skip_requesting_account_id  = false

}
data "aws_wafv2_web_acl" "waf_acl" {
  name     = "${var.project}-waf-acl"
  scope    = "CLOUDFRONT"
  provider = eu-west-2.eu
}


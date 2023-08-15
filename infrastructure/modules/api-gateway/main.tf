module "api_gateway" {
  source                      = "terraform-aws-modules/apigateway-v2/aws"
  version                     = "2.2.2"
  name                        = var.api_gateway_name
  description                 = var.api_gateway_desc
  protocol_type               = var.api_gateway_protocol_type
  domain_name                 = var.domain_name
  domain_name_certificate_arn = var.acm_certificate_arn
  cors_configuration = {
    allow_headers = ["content-type", "x-amz-date", "authorization", "x-api-key", "x-amz-security-token", "x-amz-user-agent"]
    allow_methods = ["*"]
    allow_origins = ["*"]
  }
  default_route_settings                   = var.default_route_settings
  default_stage_access_log_destination_arn = var.default_stage_access_log_destination_arn
  default_stage_access_log_format          = var.default_stage_access_log_format
  mutual_tls_authentication                = var.mutual_tls_authentication
  authorizers                              = var.authorizers
  integrations                             = var.integrations
}


##########
# Route53 A record with aliases
##########

resource "aws_route53_record" "api" {
  zone_id = var.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = module.api_gateway.apigatewayv2_domain_name_configuration[0].target_domain_name
    zone_id                = module.api_gateway.apigatewayv2_domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}


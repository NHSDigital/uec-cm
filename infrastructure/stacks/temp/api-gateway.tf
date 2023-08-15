module "api_gateway" {
  source                    = "../../modules/api-gateway"
  api_gateway_name          = "temp"
  api_gateway_desc          = "temp desc"
  api_gateway_protocol_type = "HTTP"
  domain_name               = var.domain_name
  acm_certificate_arn       = module.acm.acm_certificate_arn
  zone_id                   = module.acm.r53_zone_id
  default_route_settings = {
    detailed_metrics_enabled = var.detailed_metrics_enabled
    throttling_burst_limit   = var.throttle_burst_limit
    throttling_rate_limit    = var.throttle_rate_limit
  }
  default_stage_access_log_destination_arn = aws_cloudwatch_log_group.logs.arn
  default_stage_access_log_format          = "$context.identity.sourceIp - - [$context.requestTime] \"$context.httpMethod $context.routeKey $context.protocol\" $context.status $context.responseLength $context.requestId $context.integrationErrorMessage"
  mutual_tls_authentication = {
    truststore_uri     = "s3://${module.truststore_bucket.s3_bucket_id}/${aws_s3_object.truststore.id}"
    truststore_version = aws_s3_object.truststore.version_id
  }
  authorizers  = {}
  integrations = {}
}

#####
# Cert manager
#####
module "acm" {
  source      = "../../modules/acm"
  domain_name = var.domain_name
}

#####
# Cloudwatch log group to hold api-gateway logs
#####
resource "aws_cloudwatch_log_group" "logs" {
  name              = "uec-cm"
  retention_in_days = var.logs_retention_days
}

#####
# Private key and self-signed cert - to be held in s3 bucket
# and used by api-gateway
#####
resource "tls_private_key" "private_key" {
  algorithm = "RSA"
}

resource "tls_self_signed_cert" "cm-cert" {
  is_ca_certificate = true
  private_key_pem   = tls_private_key.private_key.private_key_pem

  subject {
    common_name  = "capacity-management.nhs.uk"
    organization = "NHSEngland"
  }

  validity_period_hours = 12

  allowed_uses = [
    "cert_signing",
    "server_auth",
  ]
}

#####
# S3 bucket to hold the signed certificate
#####
module "truststore_bucket" {
  source      = "../../modules/s3"
  bucket_name = var.truststore_bucket_name
}

resource "aws_s3_object" "truststore" {
  bucket                 = module.truststore_bucket.s3_bucket_id
  key                    = "truststore.pem"
  server_side_encryption = "AES256"
  content                = tls_self_signed_cert.cm-cert.cert_pem
}

########################
# AWS Cognito User Pool used by AWS API Gateway Authorizer
########################

resource "aws_cognito_user_pool" "cm-pool" {
  name = var.cognito_pool_name
}

resource "aws_apigatewayv2_authorizer" "cm_authorizer" {
  api_id           = module.api_gateway.apigatewayv2_api_id
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name             = var.authorizer_name

  jwt_configuration {
    audience = ["example"]
    issuer   = "https://${aws_cognito_user_pool.cm-pool.endpoint}"
  }
}

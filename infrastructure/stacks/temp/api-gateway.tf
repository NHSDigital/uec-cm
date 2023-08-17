###################
# API Gateway
###################

resource "aws_api_gateway_rest_api" "cm_rest_api" {
  name = var.api_gateway_name
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

#######
# Authorizer - links cognito user pool to apig
#######
# TODO Restore later
# resource "aws_api_gateway_authorizer" "cm_users_authorizer" {
#   name          = var.gateway_authorizer
#   rest_api_id   = aws_api_gateway_rest_api.cm_rest_api.id
#   type          = "COGNITO_USER_POOLS"
#   provider_arns = ["${aws_cognito_user_pool.cm-user-pool.arn}"]
# }

#####
# Deployment
#####
# TODO when lambdas are ready
# resource "aws_api_gateway_deployment" "main" {
#   rest_api_id = aws_api_gateway_rest_api.cm_rest_api.id

#   triggers = {
#       redeployment = sha1(jsonencode([
#       aws_api_gateway_rest_api.cm_rest_api
#       ]))
#   }

#   lifecycle {
#       create_before_destroy = true
#   }

#   depends_on = [
#       aws_api_gateway_rest_api.cm_rest_api,
#       aws_api_gateway_method.organisations_GET
#   ]
# }

# TODO later ?
#####
# Usage plan
#####
# resource "aws_api_gateway_usage_plan" "standard" {
#   name         = "standard"
#   description  = "Standard Usage Plan"

#   api_stages {
#       api_id = aws_api_gateway_rest_api.cm_rest_api.id
#       stage  = aws_api_gateway_stage.main.stage_name
#   }

#   quota_settings {
#       limit  = 20000
#       offset = 2
#       period = "WEEK"
#   }

#   throttle_settings {
#       burst_limit = 50
#       rate_limit  = 100
#   }
# }

# TODO later ?
#####
# API Key
#####
# resource "aws_api_gateway_api_key" "example_key" {
#   name = "example_key"
#   value = "LyXvMVUd3L9bc5IVhpA4l5efM0jqvLFL535MVHpx"
# }

# resource "aws_api_gateway_usage_plan_key" "main" {
#   key_id        = aws_api_gateway_api_key.example_key.id
#   key_type      = "API_KEY"
#   usage_plan_id = aws_api_gateway_usage_plan.standard.id
# }

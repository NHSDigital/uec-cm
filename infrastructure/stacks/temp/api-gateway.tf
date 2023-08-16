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

resource "aws_api_gateway_authorizer" "cm_users_authorizer" {
  name          = var.gateway_authorizer
  rest_api_id   = aws_api_gateway_rest_api.cm_rest_api.id
  type          = "COGNITO_USER_POOLS"
  provider_arns = ["${aws_cognito_user_pool.cm-user-pool.arn}"]
}

#######
# Organisations endpoint
#######
resource "aws_api_gateway_resource" "organisations_resource" {
  parent_id   = aws_api_gateway_rest_api.cm_rest_api.root_resource_id
  path_part   = "organisations"
  rest_api_id = aws_api_gateway_rest_api.cm_rest_api.id
}

#######
# REST methods attached to the endpoint - POST PUT GET DELETE
# links method to apig, resource/endpoint and authorizer
#######
resource "aws_api_gateway_method" "organisations_POST" {
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cm_users_authorizer.id
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.organisations_resource.id
  rest_api_id   = aws_api_gateway_rest_api.cm_rest_api.id

  depends_on = [
    aws_api_gateway_resource.organisations_resource
  ]
}

resource "aws_api_gateway_method" "organisations_PUT" {
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cm_users_authorizer.id
  http_method   = "PUT"
  resource_id   = aws_api_gateway_resource.organisations_resource.id
  rest_api_id   = aws_api_gateway_rest_api.cm_rest_api.id

  depends_on = [
    aws_api_gateway_resource.organisations_resource
  ]
}

resource "aws_api_gateway_method" "organisations_GET" {
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cm_users_authorizer.id
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.organisations_resource.id
  rest_api_id   = aws_api_gateway_rest_api.cm_rest_api.id

  depends_on = [
    aws_api_gateway_resource.organisations_resource
  ]
}

resource "aws_api_gateway_method" "organisations_DELETE" {
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cm_users_authorizer.id
  http_method   = "DELETE"
  resource_id   = aws_api_gateway_resource.organisations_resource.id
  rest_api_id   = aws_api_gateway_rest_api.cm_rest_api.id

  depends_on = [
    aws_api_gateway_resource.organisations_resource
  ]
}

# TODO add integration and deployment later
#####
# Link lambda to HTTP method previously attached to api resource
# Note integration_http_method - Lambda functions can only be invoked via POST.
# To follow when lambdas are written
#####

# resource "aws_api_gateway_integration" "organisations_GET_integration" {
#   rest_api_id             = aws_api_gateway_rest_api.cm_rest_api.id
#   resource_id             = aws_api_gateway_resource.organisations_resource.id
#   http_method             = aws_api_gateway_method.organisations_GET.http_method
#   integration_http_method = "POST"
#   type                    = "AWS_PROXY"
#   uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${module.directory-data-manager-lambda.lambda_function_arn}/invocations"

#   depends_on = [
#      aws_api_gateway_resource.organisations_resource,
#      aws_api_gateway_method.organisations_GET
#   ]
# }

# resource "aws_api_gateway_integration" "organisations_POST_integration" {
#   rest_api_id             = aws_api_gateway_rest_api.cm_rest_api.id
#   resource_id             = aws_api_gateway_resource.organisations_resource.id
#   http_method             = aws_api_gateway_method.organisations_POST.http_method
#   integration_http_method = "POST"
#   type                    = "AWS_PROXY"
#   uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${module.directory-data-manager-lambda.lambda_function_arn}/invocations"

#   depends_on = [
#      aws_api_gateway_resource.organisations_resource,
#      aws_api_gateway_method.organisations_POST
#   ]
# }

# resource "aws_api_gateway_integration" "organisations_PUT_integration" {
#   rest_api_id             = aws_api_gateway_rest_api.cm_rest_api.id
#   resource_id             = aws_api_gateway_resource.organisations_resource.id
#   http_method             = aws_api_gateway_method.organisations_PUT.http_method
#   integration_http_method = "POST"
#   type                    = "AWS_PROXY"
#   uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${module.directory-data-manager-lambda.lambda_function_arn}/invocations"

#   depends_on = [
#      aws_api_gateway_resource.organisations_resource,
#      aws_api_gateway_method.organisations_PUT
#   ]
# }

# resource "aws_api_gateway_integration" "organisations_DELETE_integration" {
#   rest_api_id             = aws_api_gateway_rest_api.cm_rest_api.id
#   resource_id             = aws_api_gateway_resource.organisations_resource.id
#   http_method             = aws_api_gateway_method.organisations_DELETE.http_method
#   integration_http_method = "POST"
#   type                    = "AWS_PROXY"
#   uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${module.directory-data-manager-lambda.lambda_function_arn}/invocations"

#   depends_on = [
#      aws_api_gateway_resource.organisations_resource,
#      aws_api_gateway_method.organisations_DELETE
#   ]
# }

#####
# CORS
#####
module "enable_cors_on_organisations" {
  source          = "squidfunk/api-gateway-enable-cors/aws"
  version         = "0.3.3"
  api_id          = aws_api_gateway_rest_api.cm_rest_api.id
  api_resource_id = aws_api_gateway_resource.organisations_resource.id

  depends_on = [
    aws_api_gateway_resource.organisations_resource,
    aws_api_gateway_rest_api.cm_rest_api
  ]
}

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

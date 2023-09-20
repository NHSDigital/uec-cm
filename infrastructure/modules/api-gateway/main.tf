
resource "aws_api_gateway_resource" "gateway_resource" {
  parent_id   = aws_api_gateway_rest_api.rest_api.root_resource_id
  path_part   = var.path_part
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
}

#######
# REST methods attached to the endpoint - POST PUT GET DELETE
# links method to apig, resource/endpoint and authorizer
# TODO add count to control which ones are added ?
#######
resource "aws_api_gateway_method" "method_post" {
  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.gateway_resource.id
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id

  depends_on = [
    aws_api_gateway_resource.gateway_resource
  ]
}
resource "aws_api_gateway_method" "method_put" {
  authorization = "NONE"
  http_method   = "PUT"
  resource_id   = aws_api_gateway_resource.gateway_resource.id
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id

  depends_on = [
    aws_api_gateway_resource.gateway_resource
  ]
}
resource "aws_api_gateway_method" "method_get" {
  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.gateway_resource.id
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id

  depends_on = [
    aws_api_gateway_resource.gateway_resource
  ]
}
resource "aws_api_gateway_method" "method_delete" {
  authorization = "NONE"
  http_method   = "DELETE"
  resource_id   = aws_api_gateway_resource.gateway_resource.id
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id

  depends_on = [
    aws_api_gateway_resource.gateway_resource
  ]
}

#####
# Link lambda to HTTP method previously attached to api resource
# Note integration_http_method - Lambda functions can only be invoked via POST.
#####

resource "aws_api_gateway_integration" "get_integration" {
  rest_api_id             = aws_api_gateway_rest_api.rest_api.id
  resource_id             = aws_api_gateway_resource.gateway_resource.id
  http_method             = aws_api_gateway_method.method_get.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${data.aws_caller_identity.current.account_id}:function:${var.lambda_function_name}${local.workspace_suffix}/invocations"
  depends_on = [
    aws_api_gateway_resource.gateway_resource,
    aws_api_gateway_method.method_get
  ]
}

resource "aws_api_gateway_integration" "post_integration" {
  rest_api_id             = aws_api_gateway_rest_api.rest_api.id
  resource_id             = aws_api_gateway_resource.gateway_resource.id
  http_method             = aws_api_gateway_method.method_post.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${data.aws_caller_identity.current.account_id}:function:${var.lambda_function_name}${local.workspace_suffix}/invocations"
  depends_on = [
    aws_api_gateway_resource.gateway_resource,
    aws_api_gateway_method.method_post
  ]
}

resource "aws_api_gateway_integration" "put_integration" {
  rest_api_id             = aws_api_gateway_rest_api.rest_api.id
  resource_id             = aws_api_gateway_resource.gateway_resource.id
  http_method             = aws_api_gateway_method.method_put.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${data.aws_caller_identity.current.account_id}:function:${var.lambda_function_name}${local.workspace_suffix}/invocations"
  depends_on = [
    aws_api_gateway_resource.gateway_resource,
    aws_api_gateway_method.method_put
  ]
}

resource "aws_api_gateway_integration" "delete_integration" {
  rest_api_id             = aws_api_gateway_rest_api.rest_api.id
  resource_id             = aws_api_gateway_resource.gateway_resource.id
  http_method             = aws_api_gateway_method.method_delete.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${data.aws_caller_identity.current.account_id}:function:${var.lambda_function_name}${local.workspace_suffix}/invocations"
  depends_on = [
    aws_api_gateway_resource.gateway_resource,
    aws_api_gateway_method.method_delete
  ]
}


#####
# Permission for apig to call lambda
#####
resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${var.lambda_function_name}${local.workspace_suffix}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.aws_region}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.rest_api.id}/*/*"
}

module "enable_cors_on_healthcare_services" {
  source          = "squidfunk/api-gateway-enable-cors/aws"
  version         = "0.3.3"
  api_id          = aws_api_gateway_rest_api.rest_api.id
  api_resource_id = aws_api_gateway_resource.gateway_resource.id

  depends_on = [
    aws_api_gateway_resource.gateway_resource,
    aws_api_gateway_rest_api.rest_api
  ]
}

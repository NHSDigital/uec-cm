###################
# API Gateway
###################

resource "aws_api_gateway_rest_api" "cm_rest_api" {
  name = local.api_gateway_name
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

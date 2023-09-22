###################
# API Gateway
###################

resource "aws_api_gateway_rest_api" "cm_rest_api" {
  name = "${var.api_gateway_name}${local.workspace_suffix}"
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

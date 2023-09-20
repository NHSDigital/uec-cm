module "cm_rest_api" {
  source = "../../modules/api-gateway-rest-api"

  rest_api_name = var.rest_api_name
}

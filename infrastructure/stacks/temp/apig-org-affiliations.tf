resource "aws_api_gateway_resource" "organisation_affiliations_resource" {
  parent_id   = module.cm_rest_api.root_resource_id
  path_part   = "organisation_affiliations"
  rest_api_id = module.cm_rest_api.rest_api_id
}

resource "aws_api_gateway_method" "organisation_affiliations_GET" {
  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.organisation_affiliations_resource.id
  rest_api_id   = module.cm_rest_api.rest_api_id

  depends_on = [
    aws_api_gateway_resource.organisation_affiliations_resource
  ]
}

module "organisation_affiliations_integrations_get" {
  source               = "../../modules/api-gateway-integrations"
  aws_region           = var.aws_region
  account_id           = local.account_id
  rest_api_id          = module.cm_rest_api.rest_api_id
  http_method          = aws_api_gateway_method.organisation_affiliations_GET.http_method
  lambda_function_name = var.organisation_affiliations_function_name
  gateway_resource_id  = aws_api_gateway_resource.organisation_affiliations_resource.id

  depends_on = [
    aws_api_gateway_resource.organisation_affiliations_resource,
    aws_api_gateway_method.organisation_affiliations_GET
  ]
}

resource "aws_api_gateway_method" "organisation_affiliations_PUT" {
  authorization = "NONE"
  http_method   = "PUT"
  resource_id   = aws_api_gateway_resource.organisation_affiliations_resource.id
  rest_api_id   = module.cm_rest_api.rest_api_id

  depends_on = [
    aws_api_gateway_resource.organisation_affiliations_resource
  ]
}
module "organisation_affiliations_integrations_put" {
  source               = "../../modules/api-gateway-integrations"
  aws_region           = var.aws_region
  account_id           = local.account_id
  rest_api_id          = module.cm_rest_api.rest_api_id
  http_method          = aws_api_gateway_method.organisation_affiliations_PUT.http_method
  lambda_function_name = var.organisation_affiliations_function_name
  gateway_resource_id  = aws_api_gateway_resource.organisation_affiliations_resource.id

  depends_on = [
    aws_api_gateway_resource.organisation_affiliations_resource,
    aws_api_gateway_method.organisation_affiliations_GET
  ]
}

resource "aws_api_gateway_method" "organisation_affiliations_POST" {
  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.organisation_affiliations_resource.id
  rest_api_id   = module.cm_rest_api.rest_api_id

  depends_on = [
    aws_api_gateway_resource.organisation_affiliations_resource
  ]
}

module "organisation_affiliations_integrations_post" {
  source               = "../../modules/api-gateway-integrations"
  aws_region           = var.aws_region
  account_id           = local.account_id
  rest_api_id          = module.cm_rest_api.rest_api_id
  http_method          = aws_api_gateway_method.organisation_affiliations_POST.http_method
  lambda_function_name = var.organisation_affiliations_function_name
  gateway_resource_id  = aws_api_gateway_resource.organisation_affiliations_resource.id

  depends_on = [
    aws_api_gateway_resource.organisation_affiliations_resource,
    aws_api_gateway_method.organisation_affiliations_POST
  ]
}

resource "aws_api_gateway_method" "organisation_affiliations_DELETE" {
  authorization = "NONE"
  http_method   = "DELETE"
  resource_id   = aws_api_gateway_resource.organisation_affiliations_resource.id
  rest_api_id   = module.cm_rest_api.rest_api_id

  depends_on = [
    aws_api_gateway_resource.organisation_affiliations_resource
  ]
}

module "organisation_affiliations_integrations_delete" {
  source               = "../../modules/api-gateway-integrations"
  aws_region           = var.aws_region
  account_id           = local.account_id
  rest_api_id          = module.cm_rest_api.rest_api_id
  http_method          = aws_api_gateway_method.organisation_affiliations_DELETE.http_method
  lambda_function_name = var.organisation_affiliations_function_name
  gateway_resource_id  = aws_api_gateway_resource.organisation_affiliations_resource.id

  depends_on = [
    aws_api_gateway_resource.organisation_affiliations_resource,
    aws_api_gateway_method.organisation_affiliations_DELETE
  ]
}

######
# Lambda permissions
######
module "organisation_affiliations_aws_lambda_permission" {
  source               = "../../modules/api-gateway-permissions"
  aws_region           = var.aws_region
  account_id           = local.account_id
  lambda_function_name = var.organisation_affiliations_function_name
  rest_api_id          = module.cm_rest_api.rest_api_id
}

#####
# CORS
#####
module "enable_cors_on_organisation_affiliations_resource_services" {
  source          = "squidfunk/api-gateway-enable-cors/aws"
  version         = "0.3.3"
  api_id          = module.cm_rest_api.rest_api_id
  api_resource_id = aws_api_gateway_resource.organisation_affiliations_resource.id

  depends_on = [
    aws_api_gateway_resource.organisation_affiliations_resource,
    module.cm_rest_api
  ]
}




# ==============================================================================
# Context

locals {
  account_id                                    = data.aws_caller_identity.current.id
  cognito_pool_name                             = "${var.cognito_pool_name}${var.resource_group_name}"
  api_gateway_name                              = "${var.api_gateway_name}${var.resource_group_name}"
  gateway_authorizer                            = "${var.gateway_authorizer}${var.resource_group_name}"
  healthcare_services_function_name             = "${var.healthcare_services_function_name}${var.resource_group_name}"
  organisations_function_name                   = "${var.organisations_function_name}${var.resource_group_name}"
  organisation_affiliations_function_name       = "${var.organisation_affiliations_function_name}${var.resource_group_name}"
  locations_function_name                       = "${var.locations_function_name}${var.resource_group_name}"
  questionnaires_function_name                  = "${var.questionnaires_function_name}${var.resource_group_name}"
  questionnaire_responses_function_name         = "${var.questionnaire_responses_function_name}${var.resource_group_name}"
  healthcare_services_dynamodb_table_name       = "${var.healthcare_services_dynamodb_table_name}${var.resource_group_name}"
  organisations_dynamodb_table_name             = "${var.organisations_dynamodb_table_name}${var.resource_group_name}"
  organisation_affiliations_dynamodb_table_name = "${var.organisation_affiliations_dynamodb_table_name}${var.resource_group_name}"
  locations_dynamodb_table_name                 = "${var.locations_dynamodb_table_name}${var.resource_group_name}"
  questionnaires_dynamodb_table_name            = "${var.questionnaires_dynamodb_table_name}${var.resource_group_name}"
  questionnaire_responses_dynamodb_table_name   = "${var.questionnaire_responses_dynamodb_table_name}${var.resource_group_name}"
  cloudwatch_log_group_name                     = "${var.cloudwatch_log_group_name}${var.resource_group_name}"
}

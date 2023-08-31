variable "api_gateway_name" {
  description = "Name of the api gateway"
}
variable "gateway_authorizer" {
  description = "Name of api gateway authoriser"
}
variable "logs_retention_days" {
  description = "Number of days to retain logs"
}
variable "cognito_pool_name" {
  description = "Name of cognito user pool"
}
variable "healthcare_service_function_name" {
  description = "Name of lambda function for healthcare-services data manager"
}
variable "organisation_function_name" {
  description = "Name of lambda function for organisations data manager"
}
variable "organisation_affiliation_function_name" {
  description = "Name of lambda function for organisation-affiliations data manager"
}
variable "location_function_name" {
  description = "Name of lambda function for locations data manager"
}

variable "questionnaire_function_name" {
  description = "Name of lambda function for questionnaires data manager"
}
variable "questionnaire_response_function_name" {
  description = "Name of lambda function for questionnaire-responses data manager"
}
variable "organisations_function_name" {
  description = "Name of lambda function for organisations data manager"
}
variable "organisation_affiliation_function_name" {
  description = "Name of lambda function for organisation affiliation data manager"
}
variable "locations_function_name" {
  description = "Name of lambda function for locations data manager"
}
variable "questionnaire_function_name" {
  description = "Name of lambda function for questionnaire data manager"
}
variable "questionnaire_response_function_name" {
  description = "Name of lambda function for questionnaire response data manager"
}

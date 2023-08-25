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

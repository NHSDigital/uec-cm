variable "project" {
  description = "Project code typically reflects sub project of project owner eg nhse-uec-dos"
}
variable "project_owner" {
  description = "Project owner based on orgnaistion and department code eg nhse-uec"
}
variable "environment" {
  description = "The environment - dev, test, staging etc"
}
variable "domain_name" {
  description = "Domain name"
}
variable "throttle_burst_limit" {
  description = "Burst limit for throttling"
}
variable "throttle_rate_limit" {
  description = "Rate limit for throttling"
}
variable "detailed_metrics_enabled" {
  description = "Enable or disable detailed metrics"
}
variable "logs_retention_days" {
  description = "Number of days to retain logs"
}
variable "truststore_bucket_name" {
  description = "Name of bucket holding trust store for api gateway"
}
variable "cognito_pool_name" {
  description = "Name of cognito user pool"
}
variable "authorizer_name" {
  description = "Name of authorizer for api gateway"
}

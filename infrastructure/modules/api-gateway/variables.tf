variable "api_gateway_name" {
  description = "Name of api gateway"
}
variable "api_gateway_desc" {
  description = "Description of api gateway"
}
variable "api_gateway_protocol_type" {
  description = "Protocol type for api gateway eg HTTP"
}
variable "domain_name" {
  description = "Domain name eg my-domain.co.uk"
}
variable "acm_certificate_arn" {
  description = "Cert resource number"
}
variable "zone_id" {
  description = "Id of r53 zone"
}
variable "default_route_settings" {
  description = "Default route settings for throttling etc"
}
variable "default_stage_access_log_destination_arn" {
  description = "Resource number of cloudwatch logs"
}
variable "default_stage_access_log_format" {
  description = "Format of cloudwatch log entries"
}
variable "mutual_tls_authentication" {
  description = "Url of bucket acting as truststore for mutual TLS authentication"
}
variable "authorizers" {
  description = "Map of api gateway authorisers "
}
variable "integrations" {
  description = "Lambdas integrated to the api-gateway"
}

output "rest_api_id" {
  description = "The name of the bucket."
  value       = resource.aws_api_gateway_rest_api.rest_api.id
}

output "acm_certificate_arn" {
  value       = module.acm.acm_certificate_arn
  description = "The resource number of cert."
}

output "r53_zone_id" {
  value       = aws_route53_zone.cm_zone.zone_id
  description = "Id of created zone"
}

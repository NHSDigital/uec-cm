module "acm" {
  source      = "terraform-aws-modules/acm/aws"
  version     = "4.3.2"
  domain_name = var.domain_name
  zone_id     = aws_route53_zone.cm_zone.id
}

resource "aws_route53_zone" "cm_zone" {
  name = var.domain_name
}

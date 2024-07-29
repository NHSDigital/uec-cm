module "front_end_bucket" {
  source        = "../../modules/s3"
  bucket_name   = "${var.project}-${var.environment}-${var.front-end-s3-bucket-name}${local.workspace_suffix}"
  website_map   = var.website_map
  force_destroy = var.force_destroy
}

module "front_end_cloudfront" {
  source                         = "../../modules/cloudfront"
  s3_bucket_id                   = module.front_end_bucket.s3_bucket_id
  s3_bucket_regional_domain_name = module.front_end_bucket.s3_bucket_bucket_regional_domain_name
  cloud_front_name               = "${var.project}-${var.environment}-${var.front-end-s3-bucket-name}${local.workspace_suffix}"
  web_acl_id                     = module.front_end_waf.waf_acl_arn
  depends_on = [
    module.front_end_waf.aws_wafv2_web_acl
  ]
}

resource "aws_s3_bucket_policy" "allow_access_from_cloudfront" {
  bucket = module.front_end_bucket.s3_bucket_id
  policy = jsonencode({
    Version = "2012-10-17",
    Id      = "PolicyForCloudFrontPrivateContent",
    Statement = [
      {
        Effect    = "Allow",
        Principal = { Service = "cloudfront.amazonaws.com" },
        Action    = "s3:GetObject",
        Resource  = "${module.front_end_bucket.s3_bucket_arn}/*",
        Condition = {
          StringEquals = {
            "aws:SourceArn" = module.front_end_cloudfront.cloudfront_distribution_arn,
          }
        },
      },
    ],
  })

  depends_on = [
    module.front_end_cloudfront.s3_distribution,
    module.front_end_bucket
  ]
}

module "front_end_waf" {
  source                         = "../../modules/firewall"
  waf_name                       = "${var.project}-waf-acl"
  waf_reputation_rule_name       = "${var.project}-aws-ip-reputation-list"
  waf_acl_metric_name            = "${var.project}-waf-acl-metric"
  waf_dashboard_name             = "${var.project}-wafv2-dashboard"
  waf_log_group_name             = "${var.project}-aws-waf-logs"
  non_gb_rule_metric_name        = "${var.project}-waf-non-GB-geo-match-metric"
  ip_reputation_list_metric_name = "${var.project}-waf-aws-ip-reputation-list-metric"
  generate_waf_logs              = false
  aws_region                     = var.aws_region

}

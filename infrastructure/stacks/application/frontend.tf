module "front_end_bucket" {
  source                  = "../../modules/s3"
  bucket_name             = "${var.project}-${var.environment}-${var.front-end-s3-bucket-name}${local.workspace_suffix}"
}

resource "aws_s3_object" "index_html" {
  bucket       = module.front_end_bucket.s3_bucket_id
  key          = "index.html"
  content      = "<html><body><h1>Hello, UEC CM World!</h1></body></html>"
  content_type = "text/html"
}

module "front_end_cloudfront" {
  source                         = "../../modules/cloudfront"
  s3_bucket_id                   = module.front_end_bucket.s3_bucket_id
  s3_bucket_regional_domain_name = module.front_end_bucket.s3_bucket_bucket_domain_name
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

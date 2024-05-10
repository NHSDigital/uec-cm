module "s3_bucket" {
  source      = "../../modules/s3"
  bucket_name = "${var.s3_bucket_name}${local.workspace_suffix}"
}

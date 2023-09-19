# ==============================================================================
# Context

locals {
  account_id = data.aws_caller_identity.current.id

  athena_bucket_name                  = "${var.project}-${var.environment}-${var.athena_bucket_name}"
  athena_database_name                = replace("${var.athena_database_name}", "-", "_")
  athena_workgroup_name               = var.athena_workgroup_name
  athena_data_catalogue_name          = var.athena_data_catalogue_name
  athena_data_catalogue_lambda_name   = var.athena_data_catalogue_lambda_name
  athena_dynamo_connect_cf_stack_name = var.athena_dynamo_connect_cf_stack_name
}


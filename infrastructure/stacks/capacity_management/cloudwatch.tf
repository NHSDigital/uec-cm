resource "aws_cloudwatch_log_group" "logs" {
  name              = "${var.cloudwatch_log_group_name}-${terraform.workspace}"
  retention_in_days = var.logs_retention_days
}

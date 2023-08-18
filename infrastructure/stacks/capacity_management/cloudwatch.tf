resource "aws_cloudwatch_log_group" "logs" {
  name              = "uec-cm"
  retention_in_days = var.logs_retention_days
}
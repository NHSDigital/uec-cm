resource "aws_cognito_user_pool" "cm-user-pool" {
  name = local.cognito_pool_name
}
resource "aws_cognito_user_pool_client" "cm-user-pool_client" {
  name         = "${local.cognito_pool_name}-client"
  user_pool_id = aws_cognito_user_pool.cm-user-pool.id
}

# ==============================================================================
# Context

locals {

  terraform-git-repo = "uec-cm"
  account_id         = data.aws_caller_identity.current.id
}

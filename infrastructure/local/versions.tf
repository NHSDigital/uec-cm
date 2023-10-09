terraform {
  required_version = ">= 1.5.0, < 1.5.7"

  backend "local" {
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.3.0, < 5.4.0"
    }
  }
}

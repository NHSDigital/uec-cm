variable "cm_temp_bucket_name" {
  description = "Temp stack to test deployment"
}

variable "front-end-s3-bucket-name" {
  description = "CM Front End"
}

variable "force_destroy" {
  description = "Whether to forcefully destroy the bucket when it contains objects"
  type        = bool
  default     = true
}

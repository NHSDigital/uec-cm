variable "project" {
  description = "Project code typically reflects sub project of project owner eg nhse-uec-dos"
}
variable "project_owner" {
  description = "Project owner based on orgnaistion and department code eg nhse-uec"
}
variable "environment" {
  description = "The environment - dev, test, staging etc"
}
variable "organisations_table_name" { default = "organisations"}
variable "locations_table_name" { default = "locations"}
variable "healthcare_services_table_name" { default = "healthcare_services"}
variable "sdc_table_name" { default = "sdc"}
variable "hash_key" { default = "id" }
variable "autoscaling_enabled" { default = true }
variable "stream_enabled" { default = true }
variable "stream_view_type" { default = "NEW_AND_OLD_IMAGES" }
variable "attributes" { default = [{
  name = "id"
  type = "S"
}] }
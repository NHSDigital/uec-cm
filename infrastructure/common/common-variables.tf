# Variables used in every stack
variable "project" {
  description = "Project code typically reflects sub project of project owner eg nhse-uec-dos"
}
variable "project_owner" {
  description = "Project owner based on orgnaistion and department code eg nhse-uec"
}
variable "environment" {
  description = "The environment - dev, test, staging etc"
}
variable "repo_name" {
  description = "The name of git hub repository"
}
variable "resource_group_name" {
  description = "Identifier for group of resources eg linked to feature branch in dev/test"
}

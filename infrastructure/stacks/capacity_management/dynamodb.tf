module "dynamodb_organisations_table" {
  source = "../../modules/dynamodb"

  table_name = "organisations"
}

module "dynamodb_organisation_affiliation_table" {
  source = "../../modules/dynamodb"

  table_name = "organisation_affiliation"
}

module "dynamodb_locations_table" {
  source = "../../modules/dynamodb"

  table_name = "locations"
}

module "dynamodb_healthcare_services_table" {
  source = "../../modules/dynamodb"

  table_name = "healthcare_services"
}

module "dynamodb_questionnaire_table" {
  source = "../../modules/dynamodb"

  table_name = "questionnaire"
}

module "dynamodb_questionnaire_response_table" {
  source = "../../modules/dynamodb"

  table_name = "questionnaire_response"
}


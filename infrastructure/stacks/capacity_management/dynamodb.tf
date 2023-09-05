module "dynamodb_organisations_table" {
  source = "../../modules/dynamodb"

  table_name = "organisations"
}

module "dynamodb_organisation_affiliations_table" {
  source = "../../modules/dynamodb"

  table_name = "organisation_affiliations"
}

module "dynamodb_locations_table" {
  source = "../../modules/dynamodb"

  table_name = "locations"
}

module "dynamodb_healthcare_services_table" {
  source = "../../modules/dynamodb"

  table_name = "healthcare_services"
}

module "dynamodb_questionnaires_table" {
  source = "../../modules/dynamodb"

  table_name = "questionnaires"
}

module "dynamodb_questionnaire_responses_table" {
  source = "../../modules/dynamodb"

  table_name = "questionnaire_responses"
}

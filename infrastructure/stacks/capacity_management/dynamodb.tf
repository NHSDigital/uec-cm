module "dynamodb_organisations_table" {
  source   = "../../modules/dynamodb"

  table_name     = var.organisations_table_name
  hash_key = "id"
  autoscaling_enabled = true
  stream_enabled = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attributes = [
    {
      name = "id"
      type = "S"
    }
  ]
}

module "dynamodb_locations_table" {
  source   = "../../modules/dynamodb"

  table_name     = var.locations_table_name
  hash_key = "id"
  autoscaling_enabled = true
  stream_enabled = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attributes = [
    {
      name = "id"
      type = "S"
    }
  ]
}

module "dynamodb_healthcare_services_table" {
  source   = "../../modules/dynamodb"

  table_name     = var.healthcare_services_table_name
  hash_key = "id"
  autoscaling_enabled = true
  stream_enabled = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attributes = [
    {
      name = "id"
      type = "S"
    }
  ]
}

module "dynamodb_sdc_table" {
  source   = "../../modules/dynamodb"

  table_name     = var.sdc_table_name
  hash_key = "id"
  autoscaling_enabled = true
  stream_enabled = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attributes = [
    {
      name = "id"
      type = "S"
    }
  ]
}
#!/usr/bin/python
# -*- coding: utf-8 -*-
import pandas as pd
from decimal import Decimal
import boto3

dynamodb = boto3.resource("dynamodb")
ddbclient = boto3.client("dynamodb")

path_to_excel = "./CapacityManagementFullDataset.xlsx"

# A list of the relevant dynamoDB tables, and the names of the corresponding
# tabs in the spreadsheet. These must be manually confirmed to be correct
# or the script won't work

FHIR_entities = [
    {"db_table_name": "organisations", "spreadsheet_tab_name": "FHIR Organization"},
    {
        "db_table_name": "healthcare_services",
        "spreadsheet_tab_name": "FHIR Healthcare Service",
    },
    {
        "db_table_name": "organisation_affiliations",
        "spreadsheet_tab_name": "FHIR Organization affiliation",
    },
    {"db_table_name": "locations", "spreadsheet_tab_name": "FHIR Location"},
]


def populate_database():
    print("****************************************************************")
    print("**********Running the database populator script*****************")
    print("****************************************************************")

    for FHIR_entity in FHIR_entities:
        # Perform a check to determine if the dynamoDB table is empty or not
        print(FHIR_entity)
        print(":::::Running populator script for table: " + FHIR_entity["db_table_name"])
        """if check_data_exists_in_db(FHIR_entity["db_table_name"]):
            print(
                ":::::DynamoDB Table: "
                + FHIR_entity["db_table_name"]
                + " has existing data within it."
            )
            print(":::::Taking no further action.")

        else:
            print(
                ":::::DynamoDB Table: " + FHIR_entity["db_table_name"] + " is empty..."
            )
            print(
                ":::::Running populator script for table: "
                + FHIR_entity["db_table_name"]
            )"""

            # Extract the data from the excel file at the relevant tab
            # name into a pandas dataframe

        df = pd.read_excel(
            path_to_excel, sheet_name=FHIR_entity["spreadsheet_tab_name"]
        )

            # Copy the data from the spreadsheet into the relevant table

        copy_data_from_spreadsheet(FHIR_entity["db_table_name"], df)

    return


def check_data_exists_in_db(table):
    # If the table has an ItemCount of zero, we can safely assume that
    # the table is empty and can be populated

    if ddbclient.describe_table(TableName=table)["Table"]["ItemCount"] == 0:
        return False
    else:
        return True


def copy_data_from_spreadsheet(table, df):
    print("::::Populating data into DynamoDB Table: " + table)

    # Loop through each row in the dataframe

    for index, row in df.iterrows():
        # Transpose into the FHIR schema and insert into dynamo

        data_item = transpose_into_schema(table, row)
        insert_into_table(table, data_item)
    return


def transpose_into_schema(table, row):
    print("Row Data:", row)
    if table == "organisation_affiliations":
        schema = {
            "resourceType": "OrganizationAffiliation",
            "id": str(row['Identifier']),
            "participatingOrganization": row['ParticipatingOrganization'],
            "organizationIdentifier": row['FHIROrganizationIdentifier'],
            "organization": row['Organization'],
            "healthcareService": {str(row['HealthcareService']) if pd.notna(row['HealthcareService']) else "N/A"},
            "healthcareServiceIdentifier": row['FHIRHealthcareServiceIdentifier'],
            "locationName": {str(row['LocationName']) if pd.notna(row['LocationName']) else "N/A"},
            "locationIdentifier": row['FHIRLocationIdentifier'],
            "createdBy": row['CreatedBy'],
            "createdDateTime": row['CreatedDateTime'],
            "modifiedBy": row['ModifiedBy'],
            "modifiedDateTime": row['ModifiedDateTime']
        }

    elif table == "healthcare_services":
        schema = {
            "resourceType": "HealthcareService",
            "id": str(row['Identifier']),
            "Status": "Active",
            "name": row['Name'],
            "description": row['Description'],
            "phoneNumber": {str(row['PhoneNumber']) if pd.notna(row['PhoneNumber']) else "N/A"},
            "address": "N/A",
            "location": row['Location'],
            "createdBy": row['CreatedBy'],
            "createdDateTime": row['CreatedDateTime'],
            "modifiedBy": row['ModifiedBy'],
            "modifiedDateTime": row['ModifiedDateTime'],
            "providedBy": row['ProvidedBy']
        }
    elif table == "organisations":
        schema = {
            "resourceType": "Organization",
            "id": str(row['Identifier']),
            "type": row['OrgType'],
            "name": str(row['Name']),
            "description": str(row['Name']),
            "phoneNumber": {str(row['PhoneNumber']) if pd.notna(row['PhoneNumber']) else "N/A"},
            "Address": {str(row['Address']) if pd.notna(row['Address']) else "N/A"},
            "createdDateTime": row['CreatedDateTime'],
            "partOf": {str(row['PartOf']) if pd.notna(row['PartOf']) else "N/A"},
            "createdBy": row['CreatedBy'],
            "modifiedBy": row['ModifiedBy'],
            "modifiedDateTime": row['ModifiedDateTime']
        }
    elif table == "locations":
        schema = {
            "resourceType": "Location",
            "id": str(row['Identifier']),
            "status": "Active",
            "name": row['Name'],
            "address": row['Address'],
            "latitude": str(Decimal(row['Latitude'])),
            "longitude": str(Decimal(row['Longitude'])),
            "createdBy": row['CreatedBy'],
            "createdDateTime": row['CreatedDateTime'],
            "modifiedBy": row['ModifiedBy'],
            "modifiedDateTime": row['ModifiedDateTime']
        }

    return schema


def insert_into_table(table, data_item):
    print("dyno Data:", data_item)
    table = dynamodb.Table(table)
    table.put_item(Item=data_item)


if __name__ == "__main__":
    populate_database()

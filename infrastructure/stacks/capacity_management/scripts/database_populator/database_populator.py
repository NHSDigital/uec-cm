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
    {"db_table_name": "organisations", "spreadsheet_tab_name": "FHIR organisation"},
    {"db_table_name": "locations", "spreadsheet_tab_name": "FHIR location"},
    {
        "db_table_name": "healthcare_services",
        "spreadsheet_tab_name": "FHIR health service",
    },
    {
        "db_table_name": "organisation_affiliation",
        "spreadsheet_tab_name": "FHIR Organisation affiliation",
    },
]


def populate_database():
    print("****************************************************************")
    print("**********Running the database populator script*****************")
    print("****************************************************************")

    for FHIR_entity in FHIR_entities:
        # Perform a check to determine if the dynamoDB table is empty or not
        print(FHIR_entity)
        if check_data_exists_in_db(FHIR_entity["db_table_name"]):
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
            )

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
    if table == "organisation_affiliation":
        schema = {
            "resourceType": "OrganizationAffiliation",
            "identifier": "",
            "active": "",
            "period": "",
            "organization": "",
            "participatingOrganization": "",
            "network": "",
            "code": "",
            "specialty": "",
            "location": "",
            "healthcareService": "",
            "telecom": "",
            "endpoint": "",
        }

    elif table == "healthcare_services":
        schema = {
            "resourceType": "HealthcareService",
            "identifier": "",
            "active": "",
            "providedBy": "",
            "offeredIn": "",
            "category": "",
            "type": "",
            "specialty": "",
            "location": "",
            "name": "",
            "comment": "",
            "extraDetails": "",
            "photo": "",
            "contact": "",
            "coverageArea": "",
            "serviceProvisionCode": "",
            "eligibility": [{"code": "", "comment": ""}],
            "program": "",
            "characteristic": "",
            "communication": "",
            "referralMethod": "",
            "appointmentRequired": "",
            "availability": "",
            "endpoint": "",
        }
    elif table == "organisations":
        schema = {
            "resourceType": "Organization",
            "identifier": "",
            "active": "",
            "type": "",
            "name": "",
            "alias": "",
            "description": "",
            "contact": "",
            "partOf": "",
            "endpoint": "",
            "qualification": [
                {
                    "identifier": "",
                    "code": "",
                    "period": "",
                    "issuer": "",
                }
            ],
        }
    elif table == "locations":
        schema = {
            "resourceType": "Location",
            "identifier": row["Identifier"],
            "status": "empty",
            "operationalStatus": "empty",
            "name": "empty",
            "alias": "empty",
            "description": "empty",
            "mode": "empty",
            "type": "empty",
            "contact": "empty",
            "address": row["Address"],
            "form": "empty",
            "position": {
                "longitude": Decimal(str(row["Positon (Longitude)"])),
                "latitude": Decimal(str(row["Positon (Latitude)"])),
                "altitude": 0,
            },
            "managingOrganization": "empty",
            "partOf": "empty",
            "characteristic": "empty",
            "hoursOfOperation": "empty",
            "virtualService": "empty",
            "endpoint": "empty",
        }

    return schema


def insert_into_table(table, data_item):
    table = dynamodb.Table(table)
    table.put_item(Item=data_item)


if __name__ == "__main__":
    populate_database()

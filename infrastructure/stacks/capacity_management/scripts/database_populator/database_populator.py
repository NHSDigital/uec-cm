#!/usr/bin/python
# -*- coding: utf-8 -*-
import pandas as pd
from decimal import Decimal
import boto3
from io import BytesIO
import datetime

# Initialize the S3 and DynamoDB clients
s3 = boto3.client("s3")
dynamodb = boto3.resource("dynamodb")
ddbclient = boto3.client("dynamodb")

# Specify the S3 bucket name and Excel file key
bucket_name = "nhse-uec-cm-dev-databucket"
file_key = "CapacityManagementFullDataset.xlsx"

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
        print(
            ":::::Running populator script for table: " + FHIR_entity["db_table_name"]
        )
        # Use the S3 `get_object` method to read the Excel file directly into a DataFrame
        excel_object = s3.get_object(Bucket=bucket_name, Key=file_key)
        df = pd.read_excel(
            BytesIO(excel_object["Body"].read()),
            sheet_name=FHIR_entity["spreadsheet_tab_name"],
        )
        # Copy the data from the spreadsheet into the relevant table
        copy_data_to_dynamodb(FHIR_entity["db_table_name"], df)


def copy_data_to_dynamodb(table_name, df):
    table = dynamodb.Table(table_name)

    for index, row in df.iterrows():
        data_item = transpose_into_schema(table_name, row)
        insert_into_table(table, data_item)


# Define a function to get the current date and time in UK format
def get_formatted_datetime():
    current_datetime = datetime.datetime.now()
    return current_datetime.strftime("%d-%m-%Y %H:%M:%S")


def split_telecom_numbers(telecom_str):
    telecom_numbers = []
    if isinstance(telecom_str, str):
        # Split the "telecom" field by ',' to get individual telephone numbers
        telecom_list = telecom_str.split(",")
        for telecom_item in telecom_list:
            telecom_item = telecom_item.strip()  # Remove leading/trailing spaces
            telecom_numbers.append({"system": "phone", "value": telecom_item})
    return telecom_numbers


def filter_empty_address_fields(address):
    filtered_address = {}
    for k, v in address.items():
        if isinstance(v, str) and v.strip() != "" and v.strip().lower() != "nan":
            filtered_address[k] = v
    return filtered_address


def transpose_into_schema(table_name, row):
    formatted_datetime = get_formatted_datetime()
    print("Row Data:", row)
    if table_name == "organisation_affiliations":
        schema = {
            "resourceType": "OrganizationAffiliation",
            "id": str(row["Identifier"]),
            "participatingOrganization": row["ParticipatingOrganization"],
            "organizationIdentifier": row["FHIROrganizationIdentifier"],
            "organization": row["Organization"],
            "healthcareService": {
                str(row["HealthcareService"])
                if pd.notna(row["HealthcareService"])
                else "N/A"
            },
            "healthcareServiceIdentifier": row["FHIRHealthcareServiceIdentifier"],
            "locationName": {
                str(row["LocationName"]) if pd.notna(row["LocationName"]) else "N/A"
            },
            "locationIdentifier": row["FHIRLocationIdentifier"],
            "createdBy": row["CreatedBy"],
            "createdDateTime": row["CreatedDateTime"],
            "modifiedBy": row["ModifiedBy"],
            "modifiedDateTime": row["ModifiedDateTime"],
        }

    elif table_name == "healthcare_services":
        schema = {
            "resourceType": "HealthcareService",
            "id": str(row["Identifier"]),
            "Status": "Active",
            "name": row["Name"],
            "description": row["Description"],
            "phoneNumber": {
                str(row["PhoneNumber"]) if pd.notna(row["PhoneNumber"]) else "N/A"
            },
            "address": "N/A",
            "location": row["Location"],
            "createdBy": row["CreatedBy"],
            "createdDateTime": row["CreatedDateTime"],
            "modifiedBy": row["ModifiedBy"],
            "modifiedDateTime": row["ModifiedDateTime"],
            "providedBy": row["ProvidedBy"],
        }
    elif table_name == "organisations":
        telecom_numbers = split_telecom_numbers(row["Telecom"])
        address = {
            "line1": str(row["Line1"]),
            "line2": str(row["Line2"]),
            "line3": str(row["Line3"]),
            "city": str(row["City"]),
            "district": str(row["Discrict"]),
            "postalcode": str(row["PostalCode"]),
        }
        filtered_address = filter_empty_address_fields(address)
        schema = {
            "resourceType": "Organization",
            "id": str(row["Identifier"]),
            "identifier": [
                {
                    "use": "official",
                    "value": str(row["Identifier"]),
                }
            ],
            "active": "true",
            "type": row["Type"],
            "name": str(row["Name"]),
            "telecom": telecom_numbers,
            "Address": filtered_address,
            "createdDateTime": formatted_datetime,
            "partOf": str(row["partof"]),
            "createdBy": "Admin",
            "modifiedBy": "Admin",
            "modifiedDateTime": formatted_datetime,
        }

        if not telecom_numbers:  # If there is no telecom data in the source file
            schema.pop("telecom")  # Remove the telecom field from the schema
        if not filtered_address:  # If there is no address data in the source file
            schema.pop("Address")  # Remove the Address field from the schema
        if row["partof"] in [
            "",
            None,
            "N/A",
            "N/A",
            "NO ID",
        ]:  # If the partOf field is blank, null, n/a, N/A, or NO ID
            schema.pop("partOf")  # Remove the partOf field from the schema

    elif table_name == "locations":
        schema = {
            "resourceType": "Location",
            "id": str(row["Identifier"]),
            "status": "Active",
            "name": row["Name"],
            "address": row["Address"],
            "latitude": str(Decimal(row["Latitude"])),
            "longitude": str(Decimal(row["Longitude"])),
            "createdBy": row["CreatedBy"],
            "createdDateTime": row["CreatedDateTime"],
            "modifiedBy": row["ModifiedBy"],
            "modifiedDateTime": row["ModifiedDateTime"],
        }

    return schema


def insert_into_table(table, data_item):
    print("dyno Data:", data_item)
    table.put_item(Item=data_item)


if __name__ == "__main__":
    populate_database()

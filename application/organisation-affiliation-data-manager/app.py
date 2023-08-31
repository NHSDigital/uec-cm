from chalice import Chalice

#   import json   //Packages to be imported once Chalice is deployed
import boto3

#   import uuid   //Packages to be imported once Chalice is deployed
#   from boto3.dynamodb.conditions import Key //Packages to be imported once Chalice is deployed

app = Chalice(app_name="organisation-affiliation-data-manager")
dynamodb = boto3.resource("dynamodb")


@app.route("/organisation_affiliation", methods=["GET"], cors=True)
def get_organisationaffiliation():
    #   request = app.current_request.json_body  //Required to get request from the API Gateway once it's set up

    print("Get organisationaffiliation")

    organisationaffiliation_table = dynamodb.Table("organisation_affiliation")

    response = organisationaffiliation_table.get_item(
        Key={
            "id": "001",
        }
    )

    print(response["Item"])

    print("\n\n\n-------\n\n\n")


@app.route("/organisationaffiliation", methods=["POST"])
def create_organisationaffiliation():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Creating organisationaffiliation")

    organisationaffiliation_table = dynamodb.Table("organisation_affiliation")

    organisationaffiliation_table.put_item(
        Item={
            "id": "002",
            "HospitalName": "Middlesex Hospital",
            "HospitalLocation": "London",
        }
    )

    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/organisationaffiliation", methods=["PUT"])
def update_organisationaffiliation():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Update organisationaffiliation")

    organisationaffiliation_table = dynamodb.Table("organisation_affiliation")

    organisationaffiliation_table.update_item(
        Key={"id": "002"},
        UpdateExpression="set HospitalLocation= :h",
        ExpressionAttributeValues={":h": "York"},
        ReturnValues="UPDATED_NEW",
    )

    return {"statusCode": 200, "body": "Item Updated Successfully"}


@app.route("/organisationaffiliation", methods=["DELETE"])
def delete_organisationaffiliation():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Delete organisationaffiliation")

    organisationaffiliation_table = dynamodb.Table("organisation_affiliation")

    organisationaffiliation_table.delete_item(
        Key={
            "id": "002",
        }
    )

    return {"statusCode": 200, "body": "Item Deleted Successfully"}

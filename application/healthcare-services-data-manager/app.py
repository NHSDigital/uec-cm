from chalice import Chalice
#   import json   //Packages to be imported once Chalice is deployed
import boto3
#   import uuid   //Packages to be imported once Chalice is deployed
#   from boto3.dynamodb.conditions import Key //Packages to be imported once Chalice is deployed

app = Chalice(app_name="healthcare-services-data-manager")
dynamodb = boto3.resource("dynamodb")


@app.route("/healthcareservices", methods=["GET"], cors=True)
def get_healthcareservice():
    #   request = app.current_request.json_body  //Required to get request from the API Gateway once it's set up

    print("Get healthcareservices")

    healthcareservices_table = dynamodb.Table("healthcare_services")

    response = healthcareservices_table.get_item(
        Key={
            "id": "001",
        }
    )

    print(response["Item"])

    print("\n\n\n-------\n\n\n")


@app.route("/healthcareservices", methods=["POST"])
def create_healtcareservice():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Creating healthcareservices..")

    healthcareservices_table = dynamodb.Table("healthcare_services")

    healthcareservices_table.put_item(
        Item={
            "id": "002",
            "HospitalName": "Middlesex Hospital",
            "HospitalLocation": "London",
        }
    )

    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/healthcareservices", methods=["PUT"])
def update_healthcareservices():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Update healthcareservices")

    healthcareservices_table = dynamodb.Table("healthcare_services")

    healthcareservices_table.update_item(
        Key={"id": "002"},
        UpdateExpression="set HospitalLocation= :h",
        ExpressionAttributeValues={":h": "York"},
        ReturnValues="UPDATED_NEW",
    )

    return {"statusCode": 200, "body": "Item Updated Successfully"}


@app.route("/healthcareservices", methods=["DELETE"])
def delete_healthcareservices():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Delete healthcareservices")

    healthcareservices_table = dynamodb.Table("healthcare_services")

    healthcareservices_table.delete_item(
        Key={
            "id": "002",
        }
    )

    return {"statusCode": 200, "body": "Item Deleted Successfully"}

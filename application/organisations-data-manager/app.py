from chalice import Chalice

#   import json   //Packages to be imported once Chalice is deployed
import boto3

#   import uuid   //Packages to be imported once Chalice is deployed
#   from boto3.dynamodb.conditions import Key //Packages to be imported once Chalice is deployed

app = Chalice(app_name="organisations-data-manager")
dynamodb = boto3.resource("dynamodb")


@app.route("/organisations", methods=["GET"], cors=True)
def get_organisations():
    #   request = app.current_request.json_body  //Required to get request from the API Gateway once it's set up

    print("Get organisations")

    organisations_table = dynamodb.Table("organisations")

    response = organisations_table.get_item(
        Key={
            "id": "001",
        }
    )

    print(response["Item"])

    print("\n\n\n-------\n\n\n")


@app.route("/organisations", methods=["POST"])
def create_organisations():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Creating organisations")

    organisations_table = dynamodb.Table("organisations")

    organisations_table.put_item(
        Item={
            "id": "002",
            "HospitalName": "Middlesex Hospital",
            "HospitalLocation": "London",
        }
    )

    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/organisations", methods=["PUT"])
def update_organisations():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Update organisations")

    organisations_table = dynamodb.Table("organisations")

    organisations_table.update_item(
        Key={"id": "002"},
        UpdateExpression="set HospitalLocation= :h",
        ExpressionAttributeValues={":h": "York"},
        ReturnValues="UPDATED_NEW",
    )

    return {"statusCode": 200, "body": "Item Updated Successfully"}


@app.route("/organisations", methods=["DELETE"])
def delete_organisations():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Delete organisations")

    organisations_table = dynamodb.Table("organisations")

    organisations_table.delete_item(
        Key={
            "id": "002",
        }
    )

    return {"statusCode": 200, "body": "Item Deleted Successfully"}

from chalice import Chalice

#   import json   //Packages to be imported once Chalice is deployed
import boto3

#   import uuid   //Packages to be imported once Chalice is deployed
#   from boto3.dynamodb.conditions import Key //Packages to be imported once Chalice is deployed

app = Chalice(app_name="locations-data-manager")
dynamodb = boto3.resource("dynamodb")


@app.route("/locations", methods=["GET"], cors=True)
def get_locations():
    #   request = app.current_request.json_body  //Required to get request from the API Gateway once it's set up

    print("Get locations")

    locations_table = dynamodb.Table("locations")

    response = locations_table.get_item(
        Key={
            "id": "001",
        }
    )

    print(response["Item"])

    print("\n\n\n-------\n\n\n")


@app.route("/locations", methods=["POST"])
def create_locations():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Creating locations")

    locations_table = dynamodb.Table("locations")

    locations_table.put_item(
        Item={
            "id": "002",
            "HospitalName": "Middlesex Hospital",
            "HospitalLocation": "London",
        }
    )

    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/locations", methods=["PUT"])
def update_locations():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Update locations")

    locations_table = dynamodb.Table("locations")

    locations_table.update_item(
        Key={"id": "002"},
        UpdateExpression="set HospitalLocation= :h",
        ExpressionAttributeValues={":h": "York"},
        ReturnValues="UPDATED_NEW",
    )

    return {"statusCode": 200, "body": "Item Updated Successfully"}


@app.route("/locations", methods=["DELETE"])
def delete_locations():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Delete locations")

    locations_table = dynamodb.Table("locations")

    locations_table.delete_item(
        Key={
            "id": "002",
        }
    )

    return {"statusCode": 200, "body": "Item Deleted Successfully"}

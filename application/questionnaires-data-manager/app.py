from chalice import Chalice

#   import json   //Packages to be imported once Chalice is deployed
import boto3

#   import uuid   //Packages to be imported once Chalice is deployed
#   from boto3.dynamodb.conditions import Key //Packages to be imported once Chalice is deployed

app = Chalice(app_name="questionnaires-data-manager")
dynamodb = boto3.resource("dynamodb")


@app.route("/questionnaires", methods=["GET"], cors=True)
def get_questionnaires():
    #   request = app.current_request.json_body  //Required to get request from the API Gateway once it's set up

    print("Get questionnaires")

    questionnaires_table = dynamodb.Table("questionnaire")

    response = questionnaires_table.get_item(
        Key={
            "id": "001",
        }
    )

    print(response["Item"])

    print("\n\n\n-------\n\n\n")


@app.route("/questionnaires", methods=["POST"])
def create_questionnaires():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Creating questionnaires")

    questionnaires_table = dynamodb.Table("questionnaire")

    questionnaires_table.put_item(
        Item={
            "id": "002",
            "HospitalName": "Middlesex Hospital",
            "HospitalLocation": "London",
        }
    )

    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/questionnaires", methods=["PUT"])
def update_questionnaires():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Update questionnaires")

    questionnaires_table = dynamodb.Table("questionnaire")

    questionnaires_table.update_item(
        Key={"id": "002"},
        UpdateExpression="set HospitalLocation= :h",
        ExpressionAttributeValues={":h": "York"},
        ReturnValues="UPDATED_NEW",
    )

    return {"statusCode": 200, "body": "Item Updated Successfully"}


@app.route("/questionnaires", methods=["DELETE"])
def delete_questionnaires():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Delete questionnaires")

    questionnaires_table = dynamodb.Table("questionnaire")

    questionnaires_table.delete_item(
        Key={
            "id": "002",
        }
    )

    return {"statusCode": 200, "body": "Item Deleted Successfully"}

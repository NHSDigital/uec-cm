from chalice import Chalice

#   import json   //Packages to be imported once Chalice is deployed
import boto3

#   import uuid   //Packages to be imported once Chalice is deployed
#   from boto3.dynamodb.conditions import Key //Packages to be imported once Chalice is deployed

app = Chalice(app_name="questionnaire-data-manager")
dynamodb = boto3.resource("dynamodb")


@app.route("/questionnaire", methods=["GET"], cors=True)
def get_questionnaire():
    #   request = app.current_request.json_body  //Required to get request from the API Gateway once it's set up

    print("Get questionnaire")

    questionnaire_table = dynamodb.Table("questionnaire")

    response = questionnaire_table.get_item(
        Key={
            "id": "001",
        }
    )

    print(response["Item"])

    print("\n\n\n-------\n\n\n")


@app.route("/questionnaire", methods=["POST"])
def create_questionnaire():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Creating questionnaire")

    questionnaire_table = dynamodb.Table("questionnaire")

    questionnaire_table.put_item(
        Item={
            "id": "002",
            "HospitalName": "Middlesex Hospital",
            "HospitalLocation": "London",
        }
    )

    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/questionnaire", methods=["PUT"])
def update_questionnaire():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Update questionnaire")

    questionnaire_table = dynamodb.Table("questionnaire")

    questionnaire_table.update_item(
        Key={"id": "002"},
        UpdateExpression="set HospitalLocation= :h",
        ExpressionAttributeValues={":h": "York"},
        ReturnValues="UPDATED_NEW",
    )

    return {"statusCode": 200, "body": "Item Updated Successfully"}


@app.route("/questionnaire", methods=["DELETE"])
def delete_questionnaire():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Delete questionnaire")

    questionnaire_table = dynamodb.Table("questionnaire")

    questionnaire_table.delete_item(
        Key={
            "id": "002",
        }
    )

    return {"statusCode": 200, "body": "Item Deleted Successfully"}

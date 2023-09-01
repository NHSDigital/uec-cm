from chalice import Chalice

#   import json   //Packages to be imported once Chalice is deployed
import boto3

#   import uuid   //Packages to be imported once Chalice is deployed
#   from boto3.dynamodb.conditions import Key //Packages to be imported once Chalice is deployed

app = Chalice(app_name="questionnaire-responses-data-manager")
dynamodb = boto3.resource("dynamodb")


@app.route("/questionnaireresponses", methods=["GET"], cors=True)
def get_questionnaireresponses():
    #   request = app.current_request.json_body  //Required to get request from the API Gateway once it's set up

    print("Get questionnaireresponses")

    questionnaireresponses_table = dynamodb.Table("questionnaire_response")

    response = questionnaireresponses_table.get_item(
        Key={
            "id": "001",
        }
    )

    print(response["Item"])

    print("\n\n\n-------\n\n\n")


@app.route("/questionnaireresponses", methods=["POST"])
def create_questionnaireresponses():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Creating questionnaireresponses")

    questionnaireresponses_table = dynamodb.Table("questionnaire_response")

    questionnaireresponses_table.put_item(
        Item={
            "id": "002",
            "HospitalName": "Middlesex Hospital",
            "HospitalLocation": "London",
        }
    )

    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/questionnaireresponses", methods=["PUT"])
def update_questionnaireresponses():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Update questionnaireresponses")

    questionnaireresponses_table = dynamodb.Table("questionnaire_response")

    questionnaireresponses_table.update_item(
        Key={"id": "002"},
        UpdateExpression="set HospitalLocation= :h",
        ExpressionAttributeValues={":h": "York"},
        ReturnValues="UPDATED_NEW",
    )

    return {"statusCode": 200, "body": "Item Updated Successfully"}


@app.route("/questionnaireresponses", methods=["DELETE"])
def delete_questionnaireresponses():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Delete questionnaireresponses")

    questionnaireresponses_table = dynamodb.Table("questionnaire_response")

    questionnaireresponses_table.delete_item(
        Key={
            "id": "002",
        }
    )

    return {"statusCode": 200, "body": "Item Deleted Successfully"}

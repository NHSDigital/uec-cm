from chalice import Chalice

#   import json   //Packages to be imported once Chalice is deployed
import boto3

#   import uuid   //Packages to be imported once Chalice is deployed
#   from boto3.dynamodb.conditions import Key //Packages to be imported once Chalice is deployed

app = Chalice(app_name="questionnaire-response-data-manager")
dynamodb = boto3.resource("dynamodb")


@app.route("/questionnaireresponse", methods=["GET"], cors=True)
def get_questionnaireresponse():
    #   request = app.current_request.json_body  //Required to get request from the API Gateway once it's set up

    print("Get questionnaireresponse")

    questionnaireresponse_table = dynamodb.Table("questionnaire_response")

    response = questionnaireresponse_table.get_item(
        Key={
            "id": "001",
        }
    )

    print(response["Item"])

    print("\n\n\n-------\n\n\n")


@app.route("/questionnaireresponse", methods=["POST"])
def create_questionnaireresponse():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Creating questionnaireresponse")

    questionnaireresponse_table = dynamodb.Table("questionnaire_response")

    questionnaireresponse_table.put_item(
        Item={
            "id": "002",
            "HospitalName": "Middlesex Hospital",
            "HospitalLocation": "London",
        }
    )

    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/questionnaireresponse", methods=["PUT"])
def update_questionnaireresponse():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Update questionnaireresponse")

    questionnaireresponse_table = dynamodb.Table("questionnaire_response")

    questionnaireresponse_table.update_item(
        Key={"id": "002"},
        UpdateExpression="set HospitalLocation= :h",
        ExpressionAttributeValues={":h": "York"},
        ReturnValues="UPDATED_NEW",
    )

    return {"statusCode": 200, "body": "Item Updated Successfully"}


@app.route("/questionnaireresponse", methods=["DELETE"])
def delete_questionnaireresponse():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.

    print("Delete questionnaireresponse")

    questionnaireresponse_table = dynamodb.Table("questionnaire_response")

    questionnaireresponse_table.delete_item(
        Key={
            "id": "002",
        }
    )

    return {"statusCode": 200, "body": "Item Deleted Successfully"}

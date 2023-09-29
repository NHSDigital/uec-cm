import boto3
import os

TABLE_NAME = "questionnaire_responses"


def get_table_resource():
    dynamodb_resource = boto3.resource("dynamodb")
    return dynamodb_resource


def get_table_name():
    return TABLE_NAME + os.environ.get("WORKSPACE")


def get_record_by_id(id: str):
    dynamodb = get_table_resource()
    qr_table = dynamodb.Table(get_table_name())
    response = qr_table.get_item(Key={"id": id})
    return response


def add_record(item):
    dynamodb = get_table_resource()
    qr_table = dynamodb.Table(get_table_name())
    response = qr_table.put_item(Item=item, TableName=get_table_name())
    return response


def update_record(id: str, hospital_location: str, hospital_name: str):
    dynamodb = get_table_resource()
    qr_table = dynamodb.Table(get_table_name())
    response = qr_table.update_item(
        Key={"id": id},
        UpdateExpression="SET HospitalLocation= :h_location, HospitalName = :h_name",
        ExpressionAttributeValues={
            ":h_location": hospital_location,
            ":h_name": hospital_name,
        },
        ReturnValues="UPDATED_NEW",
    )
    return response


def delete_record(id):
    dynamodb = get_table_resource()
    qr_table = dynamodb.Table(get_table_name())
    response = qr_table.delete_item(Key={"id": id}, TableName=get_table_name())
    return response

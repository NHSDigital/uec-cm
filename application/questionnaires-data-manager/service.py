import boto3

TABLE_NAME = "questionnaires"


def get_table_resource():
    dynamodb_resource = boto3.resource("dynamodb")
    return dynamodb_resource


def get_record_by_id(id: str):
    dynamodb = get_table_resource()
    q_table = dynamodb.Table(TABLE_NAME)
    response = q_table.get_item(Key={"id": id})
    return response


def add_record(item):
    dynamodb = get_table_resource()
    q_table = dynamodb.Table(TABLE_NAME)
    response = q_table.put_item(Item=item, TableName=TABLE_NAME)
    return response


def update_record(id: str, hospital_location: str, hospital_name: str):
    dynamodb = get_table_resource()
    q_table = dynamodb.Table(TABLE_NAME)
    response = q_table.update_item(
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
    q_table = dynamodb.Table(TABLE_NAME)
    response = q_table.delete_item(Key={"id": id}, TableName=TABLE_NAME)
    return response

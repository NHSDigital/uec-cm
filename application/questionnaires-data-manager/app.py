from chalice import Chalice
import q_service


app = Chalice(app_name="questionnaires-data-manager")


@app.route("/questionnaires", methods=["GET"])
def get_questionnaires():
    print("Get questionnaires record...")
    request = app.current_request.json_body()

    q_id = request["id"]
    print("Get q_id record...".q_id)
    q_service.get_record_by_id(q_id)
    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/questionnaires", methods=["POST"])
def create_questionnaires():
    request = app.current_request.json_body
    data = {
        "id": request["id"],
        "HospitalName": request["HospitalName"],
        "HospitalLocation": request["HospitalLocation"],
    }
    print(data)
    q_service.add_record(data)

    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/questionnaires", methods=["PUT"])
def update_questionnaires():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.
    print("Updating questionnaires record...")
    request = app.current_request.json_body
    q_service.update_record(
        request["id"], request["HospitalName"], request["HospitalLocation"]
    )
    return {"statusCode": 200, "body": "Item Updated Successfully"}


@app.route("/questionnaires", methods=["DELETE"])
def delete_questionnaires():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.
    print("Delete questionnaires record...")
    request = app.current_request.json_body
    q_id = request["id"]
    q_service.delete_record(q_id)

    return {"statusCode": 200, "body": "Item Deleted Successfully"}

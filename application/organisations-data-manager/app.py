from chalice import Chalice
import o_service


app = Chalice(app_name="organisations-data-manager")


@app.route("/organisations", methods=["GET"])
def get_organisations():
    print("Get organisations record...")
    request = app.current_request.json_body()

    o_id = request["id"]
    print("Get o_id record...".o_id)
    o_service.get_record_by_id(o_id)
    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/organisations", methods=["POST"])
def create_organisations():
    request = app.current_request.json_body
    data = {
        "id": request["id"],
        "HospitalName": request["HospitalName"],
        "HospitalLocation": request["HospitalLocation"],
    }
    print(data)
    o_service.add_record(data)

    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/organisations", methods=["PUT"])
def update_organisations():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.
    print("Updating healthcareservice record...")
    request = app.current_request.json_body
    o_service.update_record(
        request["id"], request["HospitalName"], request["HospitalLocation"]
    )
    return {"statusCode": 200, "body": "Item Updated Successfully"}


@app.route("/organisations", methods=["DELETE"])
def delete_organisations():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.
    print("Delete healthcareservice record...")
    request = app.current_request.json_body
    o_id = request["id"]
    o_service.delete_record(o_id)

    return {"statusCode": 200, "body": "Item Deleted Successfully"}

from chalice import Chalice
import l_service


app = Chalice(app_name="locations-data-manager")


@app.route("/locations", methods=["GET"])
def get_locations():
    print("Get locations record...")
    request = app.current_request.json_body()

    l_id = request["id"]
    print("Get l_id record...".l_id)
    l_service.get_record_by_id(l_id)
    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/locations", methods=["POST"])
def create_locations():
    request = app.current_request.json_body
    data = {
        "id": request["id"],
        "HospitalName": request["HospitalName"],
        "HospitalLocation": request["HospitalLocation"],
    }
    print(data)
    l_service.add_record(data)

    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/locations", methods=["PUT"])
def update_locations():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.
    print("Updating locations record...")
    request = app.current_request.json_body
    l_service.update_record(
        request["id"], request["HospitalName"], request["HospitalLocation"]
    )
    return {"statusCode": 200, "body": "Item Updated Successfully"}


@app.route("/locations", methods=["DELETE"])
def delete_locations():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.
    print("Delete locations record...")
    request = app.current_request.json_body
    l_id = request["id"]
    l_service.delete_record(l_id)

    return {"statusCode": 200, "body": "Item Deleted Successfully"}

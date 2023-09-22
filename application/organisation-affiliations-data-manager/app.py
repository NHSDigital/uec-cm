from chalice import Chalice
import service


app = Chalice(app_name="organisation-affiliations-data-manager")


@app.route("/organisationaffiliations", methods=["GET"])
def get_organisationaffiliations():
    print("Get organisationaffiliations record...")
    request = app.current_request.json_body()

    oa_id = request["id"]
    print("Get oa_id record...".oa_id)
    service.get_record_by_id(oa_id)
    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/organisationaffiliations", methods=["POST"])
def create_organisationaffiliations():
    request = app.current_request.json_body
    data = {
        "id": request["id"],
        "HospitalName": request["HospitalName"],
        "HospitalLocation": request["HospitalLocation"],
    }
    print(data)
    service.add_record(data)

    return {"statusCode": 200, "body": "Item Added Successfully"}


@app.route("/organisationaffiliations", methods=["PUT"])
def update_organisationaffiliations():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.
    print("Updating organisationaffiliations record...")
    request = app.current_request.json_body
    service.update_record(
        request["id"], request["HospitalName"], request["HospitalLocation"]
    )
    return {"statusCode": 200, "body": "Item Updated Successfully"}


@app.route("/organisationaffiliations", methods=["DELETE"])
def delete_organisationaffiliations():
    #    request = app.current_request.json_body  // Required to get request from the API Gateway once it's set up.
    print("Delete healthcareservice record...")
    request = app.current_request.json_body
    oa_id = request["id"]
    service.delete_record(oa_id)

    return {"statusCode": 200, "body": "Item Deleted Successfully"}

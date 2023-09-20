from behave import given, then, step
from config.config_local import URI
import requests
from assertpy import assert_that
from utilities.api_gateway import ApiGatewayToService


def seturl(workspace, apigateway):
    agts = ApiGatewayToService()
    apigatewayid = agts.get_rest_api_id(apigateway)
    return (
        "https://"
        + str(apigatewayid)
        + ".execute-api.eu-west-2.amazonaws.com/"
        + workspace
    )


@given("I send a temperature request")
def impl_bk(context):
    context.response = requests.get(URI)


@then("I receive a 200 status response")
def get_bk(context):
    # myurl = seturl(context.workspace, context.apigateway)
    # assert_that(context.response.status_code).is_equal_to(myurl)
    assert_that(context.response.status_code).is_equal_to(200)


@step("I will receive a status {status_code} response")
def get_back(context, status_code):
    assert_that(context.response.status_code).is_equal_to(int(status_code))


@step("I get a response for the timezone GMT")
def check_timezone(context):
    response_content = context.response.json()
    assert_that(response_content["timezone"]).is_equal_to("GMT")


@step("I get a response of {value} for item {item}")
def check_items(context, value, item):
    response_content = context.response.json()
    assert_that(str(response_content[item])).is_equal_to(str(value))

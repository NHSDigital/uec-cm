from behave import given, then

import requests
from assertpy import assert_that


@given("I send a request to the resource {resource_name}")
def impl_bk(context, resource_name):
    context.response = requests.get(context.URL + "/" + resource_name)
    # assert_that((context.URL)+"/"+resource_name).is_equal_to("233")


@then("I will receive a status code {status_code} in response")
def get_back(context, status_code):
    assert_that(context.response.status_code).is_equal_to(int(status_code))

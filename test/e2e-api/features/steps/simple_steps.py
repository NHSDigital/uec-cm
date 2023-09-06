from behave import *
from config.configlocal import *
import requests
from assertpy.assertpy import assert_that


@given('I send a temperature request')
def impl_bk(context):
    context.response = requests.get(URI)


@then("I will receive a 200 status response")
def get_bk(context):
    assert_that(context.response.status_code).is_equal_to(200)

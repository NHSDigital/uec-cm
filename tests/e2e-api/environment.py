from utilities.api_gateway import ApiGatewayToService


# -- BEHAVE HOOKS:
def before_all(context):
    userdata = context.config.userdata
    workspace = userdata.get("workspace")
    apigateway_name = userdata.get("apigateway")
    agts = ApiGatewayToService()
    apigatewayid = agts.get_rest_api_id(apigateway_name)
    context.URL = (
        "https://"
        + str(apigatewayid)
        + ".execute-api.eu-west-2.amazonaws.com/"
        + workspace
    )

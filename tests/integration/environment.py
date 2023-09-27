from utilities.api_gateway import ApiGatewayToService


# -- BEHAVE HOOKS:
def before_all(context):
    # get the workspace var that has been passed through from the integration-tests script
    userdata = context.config.userdata
    # TODO: uncomment workspace once DR-412 is complete
    # workspace = userdata.get("workspace")
    workspace = 'dr-412'

    # get the api gateway name env var and then the api gateway id
    apigateway_name = userdata.get("apigateway")
    #  TODO: uncomment workspace once DR-412 is complete
    apigateway_name = apigateway_name + "-" + workspace
    print(apigateway_name)
    agts = ApiGatewayToService()
    apigatewayid = agts.get_rest_api_id(apigateway_name)

    # set the URL for the api-gateway stage identified by the workspace and api gateway id
    # TODO: swap twr for workspace once DR-412 is complete
    context.URL = (
        "https://"
        + str(apigatewayid)
        + ".execute-api.eu-west-2.amazonaws.com/default"
    )
    print(context.URL)

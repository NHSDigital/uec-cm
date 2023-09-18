import api_gateway

api_gateway_class = api_gateway.ApiGatewayToService()
response = api_gateway_class.get_rest_api_id('cm-rest-apig')
print(response)




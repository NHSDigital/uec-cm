# -- BEHAVE HOOKS:
def before_all(context):
    print("Before all executed")
    userdata = context.config.userdata
    context.workspace = userdata.get("workspace")
    context.apigateway = userdata.get("apigateway")
    print(context.workspace)

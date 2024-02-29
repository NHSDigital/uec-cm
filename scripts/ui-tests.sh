#! /bin/bash

# fail on first error
# set -e
# This script runs playwright cucumber ui tests
#
export AWS_REGION="${AWS_REGION:-""}"     # The aws region
export ACCOUNT_TYPE="${ACCOUNT_TYPE:-""}"     # The type of account being used - dev test

APPLICATION_TEST_DIR='tests/ui'

source ./scripts/functions/git-functions.sh

# identify the workspace name and set TERRAFORM_WORKSPACE_NAME
export_terraform_workspace_name
# check export has been done
EXPORTS_SET=0

if [ -z "$AWS_REGION" ] ; then
  echo Set AWS_REGION
  EXPORTS_SET=1
fi

if [ -z "$ACCOUNT_TYPE" ] ; then
  echo Set ACCOUNT_TYPE type of ACCOUNT_TYPE - one of dev, test, preprod, prod
  EXPORTS_SET=1
else
  if [[ ! $ACCOUNT_TYPE =~ ^(dev|test|preprod|prod|security) ]]; then
      echo ACCOUNT_TYPE should be dev test preprod security or prod
      EXPORTS_SET=1
  fi
fi

if [ -z "$TERRAFORM_WORKSPACE_NAME" ] ; then
  echo Set TERRAFORM_WORKSPACE_NAME
  EXPORTS_SET=1
fi

if [ $EXPORTS_SET = 1 ] ; then
  echo TERRAFORM_WORKSPACE_NAME exports not set
  exit 1
fi

# install requirements
echo "Installing requirements"
cd $APPLICATION_TEST_DIR
npm ci
npx playwright install --with-deps

echo "Running ui tests"

WORKSPACE=$TERRAFORM_WORKSPACE_NAME ENV=$ACCOUNT_TYPE REGION=$AWS_REGION npm run test_pipeline

echo "set up allure environment properties file"
cd allure-results
echo "Branch = $TERRAFORM_WORKSPACE_NAME" > environment.properties
cd ..

echo "next generating report"
allure generate --single-file -c -o  allure-reports;

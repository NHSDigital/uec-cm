#! /bin/bash

# fail on first error
set -e
# This script runs python integration tests
#
APPLICATION_DIR=application
APPLICATION_TEST_DIR='tests/e2e-api'

source ./scripts/functions/git-functions.sh

export_terraform_workspace_name


pip install -r $APPLICATION_TEST_DIR/requirements.txt
# check exports have been done

# check exports have been done
EXPORTS_SET=0
if [ -z "$TERRAFORM_WORKSPACE_NAME" ] ; then
  echo Set TERRAFORM_WORKSPACE_NAME
  EXPORTS_SET=1
fi

if [ $EXPORTS_SET = 1 ] ; then
  echo One or more exports not set
  exit 1
fi

echo "Running tests for E2E api"
# echo $TERRAFORM_WORKSPACE_NAME
cd $APPLICATION_TEST_DIR
behave --tags=tag1 -D workspace=$TERRAFORM_WORKSPACE_NAME

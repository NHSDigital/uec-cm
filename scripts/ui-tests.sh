#! /bin/bash

# fail on first error
set -e
# This script runs playwright cucumber ui tests
#
APPLICATION_TEST_DIR='tests/ui'

source ./scripts/functions/git-functions.sh

# identify the workspace name and set TERRAFORM_WORKSPACE_NAME
export_terraform_workspace_name

# check export has been done
EXPORTS_SET=0
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


echo "Running integration tests"
cd $APPLICATION_TEST_DIR
WORKSPACE=$TERRAFORM_WORKSPACE_NAME npm run test_cmd_line

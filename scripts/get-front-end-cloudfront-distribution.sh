#! /bin/bash

# This script gets the cloud front distribution id for the front end
#

echo "ENVIRONMENT: $ENVIRONMENT"
echo "WORKSPACE: $WORKSPACE"
echo "AWS_REGION: $AWS_REGION"

if [ -z "$ENVIRONMENT" ]; then
  echo "Set the ENVIRONMENT environment variable"
  exit 1;
fi

if [ -z "$WORKSPACE" ]; then
  echo "Set the WORKSPACE environment variable"
  exit 1;
fi

if [ -z "$AWS_REGION" ]; then
  echo "Set the AWS_REGION environment variable"
  exit 1;
fi

if [ "$WORKSPACE" = "default" ]; then
  FRONT_END_DOMAIN="nhse-uec-cm-${ENVIRONMENT}-front-end.s3.${AWS_REGION}.amazonaws.com"
else
  FRONT_END_DOMAIN="nhse-uec-cm-${ENVIRONMENT}-front-end-${WORKSPACE}.s3.${AWS_REGION}.amazonaws.com"
fi

echo "FRONT_END_DOMAIN: $FRONT_END_DOMAIN"

QUERY_COMMAND="DistributionList.Items[?Origins.Items[0].DomainName=='$FRONT_END_DOMAIN'].{Id: Id}[0].Id"

DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "$QUERY_COMMAND")
echo "DISTRIBUTION_ID: $DISTRIBUTION_ID"
export $DISTRIBUTION_ID=$DISTRIBUTION_ID
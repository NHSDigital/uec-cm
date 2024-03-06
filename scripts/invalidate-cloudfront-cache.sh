#! /bin/bash

# This script invalidates the CloudFront cache

echo "DISTRIBUTION_ID: $DISTRIBUTION_ID"

if [ -z "$DISTRIBUTION_ID" ]; then
  echo "DISTRIBUTION_ID is not set."
  echo "CloudFront cache will not be invalidated"
else
  echo "Invalidating CloudFront cache"

  # Remove double quotes from DISTRIBUTION_ID if they exist
  DISTRIBUTION_ID=$(echo "$DISTRIBUTION_ID" | sed 's/"//g')

  aws cloudfront get-distribution --id $DISTRIBUTION_ID --debug
  aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --debug
fi

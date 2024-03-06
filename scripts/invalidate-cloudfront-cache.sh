#! /bin/bash

# This script invalidates the CloudFront cache

echo "DISTRIBUTION_ID: $DISTRIBUTION_ID"

if [ -z "$DISTRIBUTION_ID" ]; then
  echo "DISTRIBUTION_ID is not set."
  echo "CloudFront cache will not be invalidated"
else
  echo "Invalidating CloudFront cache"
  aws cloudfront list-distributions
  aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*" --debug
fi

#! /bin/bash

# This script invalidates the cloud front cache
#

echo "DISTRIBUTION_ID: $DISTRIBUTION_ID

if [ -z "$DISTRIBUTION_ID" ]; then
  echo "DISTRIBUTION_ID is not set."
  echo "Cloudfront cache will not be invalidated"
else
  echo "Invalidating Cloudfront cache"
  aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths /*
fi

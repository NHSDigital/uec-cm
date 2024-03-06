#! /bin/bash

# This script invalidates the cloud front cache
#

echo "DISTRIBUTION_ID: $DISTRIBUTION_ID"

if [ -z "$DISTRIBUTION_ID" ]; then
  echo "DISTRIBUTION_ID is not set."
else
  echo "Invalidating cloudfront cache"
  aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths /*
fi


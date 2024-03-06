#! /bin/bash

# This script invalidates the cloud front cache
#

echo "DISTRIBUTION_ID: $DISTRIBUTION_ID"

if [ -z "$DISTRIBUTION_ID" ]; then
  echo "DISTRIBUTION_ID is not set."
fi

aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths /*

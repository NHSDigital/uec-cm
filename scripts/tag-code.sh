#! /bin/bash

# fail on first error
set -e
# This script generates a tag for git repo
# Defaults to a Test tag (T)
# To generate different tag eg release (R) prior to calling script
# export TAG_TYPE="R"
# functions
source ./scripts/project-common.sh
source ./scripts/functions/terraform-functions.sh
source ./scripts/functions/git-functions.sh

# check exports have been done
EXPORTS_SET=0

if [ -z "$TAG_TYPE" ] ; then
    echo TAG_TYPE defaulting to T
    TAG_TYPE="T"
fi

export_terraform_workspace_name
export_short_commit_hash

if [ -z "$TERRAFORM_WORKSPACE_NAME" ] ; then
    echo TERRAFORM_WORKSPACE_NAME not derived
    EXPORTS_SET=1
fi
if [ -z "$COMMIT_HASH_SHORT" ] ; then
    echo COMMIT_HASH_SHORT not derived
    EXPORTS_SET=1
fi

if [ $EXPORTS_SET = 1 ] ; then
  echo One or more exports not set
  exit 1
fi

# continue if required exports set

export_generated_tag
echo "Created tag $GENERATED_TAG (tag type: $TAG_TYPE branch $TERRAFORM_WORKSPACE_NAME commit hash: $COMMIT_HASH_SHORT)"
echo
# now tag code and push
tag_code_at_commit


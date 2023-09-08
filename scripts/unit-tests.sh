#! /bin/bash

# fail on first error
set -e
# This script runs python unit tests
#
APPLICATION_DIR=application
APPLICATION_TEST_DIR='test/unit'

# find each directory under application
# if test code exists copy it in prep for running it
# TODO get second element of the array
for path in "$APPLICATION_DIR"/*/ ; do
    dirs=$(echo "$path" | tr "\/" '\n')
    for dir in $dirs
        do
            if ! [ "$dir" == $APPLICATION_DIR ] && [ -d $APPLICATION_TEST_DIR/"$dir" ]; then
                echo "Preparing tests for $dir"
                mkdir $APPLICATION_DIR/"$dir"/test
                cp $APPLICATION_TEST_DIR/"$dir"/* $APPLICATION_DIR/"$dir"/test/
            fi
        done
done
#  use requirements defined for test/unit
pip install -r $APPLICATION_TEST_DIR/requirements.txt
python3 -m pytest $APPLICATION_DIR/*
coverage run --omit=$APPLICATION_DIR/*/test/* -m pytest $APPLICATION_DIR/*
coverage report
coverage html

#  now clear down copied test code after testing
for path in "$APPLICATION_DIR"/*/ ; do
    dirs=$(echo "$path" | tr "\/" '\n')
    for dir in $dirs
        do
            if [ -d $APPLICATION_DIR/"$dir"/test/ ]; then
                echo "Clearing down temp test files for $dir"
                rm -rf $APPLICATION_DIR/"$dir"/test
            fi
        done
done


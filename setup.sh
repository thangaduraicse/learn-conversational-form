#! /bin/sh

PRESENT_WORKING_DIRECTORY=$PWD

cd $PRESENT_WORKING_DIRECTORY/client && npm install

cd $PRESENT_WORKING_DIRECTORY/server && npm install

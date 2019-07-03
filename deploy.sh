#! /bin/sh

PRESENT_WORKING_DIRECTORY=$PWD
S3_BUCKET_NAME=cloud-farmers-demo-source
VERSION_DATE=`date +'%s'`
VERSION_LABEL=`echo $VERSION_DATE`
S3_DEPLOY_URL=s3://`echo $S3_BUCKET_NAME`/
ZIP_NAME=cloud-farmers-demo-`echo $VERSION_LABEL`.zip
ENVIRONMENT_NAME=${1:-cloud-farmers-node-env}
APPLICATION_NAME=cloud-farmers

# Execute setup.sh
sh setup.sh

# Create client build
cd $PRESENT_WORKING_DIRECTORY/client && npm run build

# Remove existing content folder in server
rm -rf $PRESENT_WORKING_DIRECTORY/server/content

# Move it to single source bundle
mv $PRESENT_WORKING_DIRECTORY/client/build $PRESENT_WORKING_DIRECTORY/server/content

# Zipping the bundle
zip -r $ZIP_NAME content aws.js server.js package.json

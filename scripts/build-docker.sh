#/bin/sh

source ./scripts/const.sh

docker build -t $DOCKER_IMAGE_NAME .

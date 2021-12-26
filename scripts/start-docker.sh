#/bin/sh

source ./scripts/const.sh

docker run --name $DOCKER_CONTAINER_NAME -d -p $DOCKER_PORT:3000 $DOCKER_IMAGE_NAME
open http://localhost:3000/

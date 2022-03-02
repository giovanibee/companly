#/bin/sh

source ./scripts/const.sh

docker stop $(docker ps -q -f "ancestor=$DOCKER_IMAGE_NAME")
docker rm  $(docker ps -qa -f "ancestor=$DOCKER_IMAGE_NAME")

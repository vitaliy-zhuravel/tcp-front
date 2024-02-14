#!/bin/bash

# stop and remove container
echo "Stop tcp-front container"
docker stop tcp-front

echo "Remove tcp-front container"
docker rm tcp-front

# build new Docker-image
echo "Build new image tcp-front"
docker build -t tcp-front .

# start new contaimner
echo "Start tcp-front container"
docker run -p 3000:3000 -d --name tcp-front tcp-front
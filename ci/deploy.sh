#!/bin/bash

# stop and remove container
docker stop tcp-front
docker rm tcp-front

# build new Docker-image
docker build -t tcp-front .

# start new contaimner
docker run -p 3000:3000 -d --name tcp-front tcp-front
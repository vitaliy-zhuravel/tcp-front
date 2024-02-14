# 1 - Stop active docker container

`docker stop tcp-front`

# 2 - Remove this container

`docker rm tcp-front`

# 3 - Build new container

`docker build -t tcp-front .`

# Start this container

`docker run -p 3000:3000 -d --name tcp-front tcp-front`
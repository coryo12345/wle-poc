#!/bin/sh

# if you want to run this in a docker container without docker compose you could run this...

docker build -t wle-poc-realtime .
docker run -d --name wle-poc-realtime --restart always wle-poc-realtime

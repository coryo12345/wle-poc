#!/bin/sh

docker build -t wle-poc-verse-service .
docker run -d --name wle-poc-verse-service --restart always wle-poc-verse-service

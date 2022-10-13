#!/bin/sh
docker build -t wle-poc-ui .
docker run -d --name wle-poc-ui --restart always wle-poc-ui

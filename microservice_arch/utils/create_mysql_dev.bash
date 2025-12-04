#!/bin/bash

sudo usermod -aG docker $USER
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:latest

docker compose -f kafka_compose.yml up -d

bash start_containers.sh



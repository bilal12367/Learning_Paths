#!/bin/bash

docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:latest

docker compose -f kafka_compose.yml up -d
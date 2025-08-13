docker run --name mysql_server \
    -e MYSQL_ROOT_PASSWORD=root \
    -p 3306:3306 \
    -d mysql:latest

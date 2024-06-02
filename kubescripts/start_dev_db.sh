

docker run -d \
  --name mongo-server \
  -e MONGO_INITDB_ROOT_USERNAME=bilal \
  -e MONGO_INITDB_ROOT_PASSWORD=bilal \
  -e MONGO_INITDB_DATABASE=test1 \
  -p 27017:27017 \
  mongo


docker run -d --name mysql-server -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=dev_test1 -e MYSQL_USER=bilal -e MYSQL_PASSWORD=bilal -p 3306:3306 mysql:latest



docker run -p 3306:3306 --name=mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:8.3.0
docker run -d -p 27017:27017 --name=mongo-example mongo:latest

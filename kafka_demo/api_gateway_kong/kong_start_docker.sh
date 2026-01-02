docker rm -f kong kong-db

docker run -d --name kong-db \
  --network host \
  -e POSTGRES_USER=kong \
  -e POSTGRES_DB=kong \
  -e POSTGRES_PASSWORD=kong \
  postgres:15

docker run --rm \
  --network host \
  -e KONG_DATABASE=postgres \
  -e KONG_PG_HOST=127.0.0.1 \
  -e KONG_PG_USER=kong \
  -e KONG_PG_PASSWORD=kong \
  -e KONG_PG_DATABASE=kong \
  kong:3.6 kong migrations bootstrap


docker run -d --name kong \
  --network host \
  -e KONG_DATABASE=postgres \
  -e KONG_PG_HOST=127.0.0.1 \
  -e KONG_PG_USER=kong \
  -e KONG_PG_PASSWORD=kong \
  -e KONG_PG_DATABASE=kong \
  -e KONG_PROXY_ACCESS_LOG=/dev/stdout \
  -e KONG_ADMIN_ACCESS_LOG=/dev/stdout \
  -e KONG_PROXY_ERROR_LOG=/dev/stderr \
  -e KONG_ADMIN_ERROR_LOG=/dev/stderr \
  -e KONG_PROXY_LISTEN=0.0.0.0:8000 \
  -e KONG_ADMIN_LISTEN=0.0.0.0:8001 \
  kong:3.6

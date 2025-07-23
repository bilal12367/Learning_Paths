

# Kong Gateway Tutorial

## Setting up kong

1. Run the following command to start kong-postgres database and kong-gateway.

```bash
./kong_start.sh
```

2. Check if there are no errors in gateway container.

```bash
docker logs kong-gateway --follow
```

## Adding Service to kong gateway.
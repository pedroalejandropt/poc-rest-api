# Softtek poc rest api lambda backend code

## Docker

To build the new image:
> npm run build
> docker compose build

To start the service emulating a lambda:
> docker compose up -d

To see the logs:
> docker compose logs

To test the lambda running you can:
> curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"payload":"hello world!"}'

#!/usr/bin/env bash

: ${NODE_ENV=development}
KEMAL_ENV=$NODE_ENV

webpack -p

if [ "$KEMAL_ENV" == "production" ]; then
  KEMAL_ENV=$KEMAL_ENV ./app --port $PORT
else
  ./sentry -w './src/**/*.cr' -w './views/**/*.ecr' -w './lib/**/*.cr'
fi

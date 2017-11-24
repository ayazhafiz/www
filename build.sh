#!/usr/bin/env bash

: "${NODE_ENV:="development"}"
KEMAL_ENV=$NODE_ENV

if [ "$KEMAL_ENV" == "production" ]; then
  webpack -p
  KEMAL_ENV=$KEMAL_ENV ./app --port "$PORT"
else
  webpack -w &
  ./sentry -w './src/**/*.cr' -w './views/**/*.ecr' -w './lib/**/*.cr' &&
  fg
fi

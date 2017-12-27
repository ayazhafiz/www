#!/usr/bin/env bash

: "${NODE_ENV:="development"}"
KEMAL_ENV=$NODE_ENV

if [ "$KEMAL_ENV" == "production" ]; then
  . "$(pwd)/target/release/originaldir"
  echo "$ORIGINAL_DIR"
  mkdir -p "$ORIGINAL_DIR/src/rmath"
  mkdir -p "$ORIGINAL_DIR/target/release"
  cp ./target/release/librcalc.so "$ORIGINAL_DIR/target/release/librcalc.so"

  webpack -p
  KEMAL_ENV=$KEMAL_ENV ./app --port "$PORT"
else
  webpack -w &
  ./sentry -w './src/**/*.cr' -w './views/**/*.ecr' -w './lib/**/*.cr' &&
  fg
fi

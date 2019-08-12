#!/usr/bin/env bash

: "${NODE_ENV:="development"}"
KEMAL_ENV=$NODE_ENV

if [ "$KEMAL_ENV" == "production" ]; then
  . "$(pwd)/target/release/originaldir"
  echo "$RUST_ORIGINAL_DIR"
  mkdir -p "$RUST_ORIGINAL_DIR/src/rmath"
  mkdir -p "$RUST_ORIGINAL_DIR/target/release"
  cp ./target/release/librcalc.so "$RUST_ORIGINAL_DIR/target/release/librcalc.so"

  webpack -p
  KEMAL_ENV=$KEMAL_ENV ./app --port "$PORT"
else
  source .env
  webpack -w &
  ./sentry -w './src/**/*.cr' -w './views/**/*.ecr' &&
  fg
fi

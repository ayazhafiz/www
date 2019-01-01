#!/usr/bin/env bash

CMAKE=${VARIABLE:=cmake}

cd deps/sherpa_41 && $CMAKE .
make
./sherpa_41-test
mv ./sherpa_41 ../../bin/sherpa_41

#!/usr/bin/env bash

cd deps/sherpa_41 && cmake .
make
./sherpa_41-test
mv ./sherpa_41 ../../bin/sherpa_41

#!/usr/bin/env bash

CMAKE_EXE=${CMAKE:=cmake}

git submodule update --init --recursive
cd deps/sherpa_41 && $CMAKE_EXE .
make
./sherpa_41-test
mv ./sherpa_41 ../../bin/sherpa_41

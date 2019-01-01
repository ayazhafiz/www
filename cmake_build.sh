#!/usr/bin/env bash

CMAKE_EXE=${CMAKE:=cmake}

echo "CXX is $CXX"
git clone --recursive https://github.com/ayazhafiz/sherpa_41 deps/sherpa_41
cd deps/sherpa_41
CXX=$CXX $CMAKE_EXE .
make
./sherpa_41-test
mv ./sherpa_41 ../../bin/sherpa_41
cd ../..
rm -rf deps

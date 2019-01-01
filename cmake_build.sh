#!/usr/bin/env bash

CMAKE_EXE=${CMAKE:=cmake}

git clone --recursive https://github.com/ayazhafiz/sherpa_41 deps/sherpa_41
cd deps/sherpa_41

echo "Including ImageMagick dirs $MAGICK_PATH $MAGICK_BASE"
$CMAKE_EXE -DImageMagick_INCLUDE_DIRS="$MAGICK_PATH;$MAGICK_BASE" .
make
./sherpa_41-test
mv ./sherpa_41 ../../bin/sherpa_41
cd ../..
rm -rf deps

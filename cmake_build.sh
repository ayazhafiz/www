#!/usr/bin/env bash

CMAKE_EXE=${CMAKE:=cmake}

git clone --recursive https://github.com/ayazhafiz/sherpa_41 deps/sherpa_41
cd deps/sherpa_41

$CMAKE_EXE \
  -DImageMagick_Magick++_INCLUDE_DIR:PATH="$MAGICK_BASE/include/ImageMagick-6" \
  -DImageMagick_Magick++_LIBRARY:FILEPATH="$MAGICK_BASE/lib/libMagick++-6.Q16.so" \
  -DImageMagick_MagickWand_INCLUDE_DIR:PATH="$MAGICK_BASE/include/ImageMagick-6" \
  -DImageMagick_MagickWand_LIBRARY:FILEPATH="$MAGICK_BASE/lib/libMagickWand-6.Q16.so" \
  -DImageMagick_MagickCore_INCLUDE_DIR:PATH="$MAGICK_BASE/include/ImageMagick-6" \
  -DImageMagick_MagickCore_LIBRARY:FILEPATH="$MAGICK_BASE/lib/libMagickCore-6.Q16.so" \
  .
  
make
./sherpa_41-test
mv ./sherpa_41 ../../bin/sherpa_41
cd ../..
rm -rf deps

#!/bin/sh
DATE=`date -u +%Y-%m-%d-%H-%M-%S`
#js/closure-library/closure/bin/build/closurebuilder.py \
#  --root=js/ \
#  --namespace="nfw.CheckForm" \
#  --output_mode=compiled \
#  --compiler_jar=js/closure-compiler/compiler.jar \
#  --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
#  --compiler_flags="--generate_exports" \
#  --output_file=compiled/main-$DATE.js

java -jar css/closure-stylesheets.jar \
  --output-file compiled/main-$DATE.css \
  css/main.css

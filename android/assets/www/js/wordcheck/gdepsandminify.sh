#!/bin/sh

# Generate deps.js
../closure/closure/bin/build/depswriter.py \
--output_file=deps.js \
--root_with_prefix="./ ../../../wordcheck"

# Generate compiled js
../closure/closure/bin/build/closurebuilder.py \
--root=../closure \
--root=./ \
--output_mode=compiled \
--compiler_jar=../closure/closure/bin/build/compiler.jar \
--output_file=wordcheck-compiled.js \
--input=start.js \
--input=lookup.js

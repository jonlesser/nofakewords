#!/bin/sh

# Get a timestamp to use for the version and make a new folder.
DATE=`date -u +%Y-%m-%d-%H-%M-%S`
echo "Timestamp will be: $DATE"
mkdir compiled/$DATE

# Compile JS.
js/closure-library/closure/bin/build/closurebuilder.py \
  --root=js/ \
  --namespace="nfw.CheckForm" \
  --output_mode=compiled \
  --compiler_jar=js/closure-compiler/compiler.jar \
  --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
  --compiler_flags="--generate_exports" \
  --output_file=compiled/$DATE/main.js

# Compress Css.
echo "Compressing CSS..."
java -jar css/closure-stylesheets.jar \
  --output-file compiled/$DATE/main.css \
  css/main.css

# Update the css and js links and the app version.
echo "Updating files..."
sed -E -i '' s/[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}/$DATE/ \
  ../main.html \
  ../app.yaml

# Clean up previous distribution
rm -rf dist
rm -rf build

# Variables
NGC=" node node_modules/.bin/ngc"
ROLLUP=" node node_modules/.bin/rollup"

# Run angular compiler
$NGC -p src/tsconfig-build.json
$ROLLUP build/material-file-input.js -o dist/material-file-input.js

rsync -a -exclude=*.js build/ dist

cp src/package.json dist/package.json

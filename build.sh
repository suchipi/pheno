#!/usr/bin/env bash

set -euo pipefail

export PATH="./node_modules/.bin:$PATH"

set -x

rm -rf dist
tsc --project tsconfig.cjs.json && echo '{"type":"commonjs"}' > dist/cjs/package.json
tsc --project tsconfig.esm.json && echo '{"type":"module"}' > dist/esm/package.json

kame bundle --output ./dist/bundle.js --config ./kame-config.js
terser ./dist/bundle.js -m eval=true -c > ./dist/bundle.min.js

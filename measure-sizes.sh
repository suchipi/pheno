#!/usr/bin/env bash
set -exuo pipefail

ls -alh dist/bundle.js
ls -alh dist/bundle.min.js

tar -cvzf bundle.tar.gz dist/bundle.js
ls -alh bundle.tar.gz
rm bundle.tar.gz

tar -cvzf bundle.min.tar.gz dist/bundle.min.js
ls -alh bundle.min.tar.gz
rm bundle.min.tar.gz

brotli dist/bundle.js -o ./bundle.br
ls -alh bundle.br
rm bundle.br

brotli dist/bundle.min.js -o ./bundle.min.br
ls -alh bundle.min.br
rm bundle.min.br

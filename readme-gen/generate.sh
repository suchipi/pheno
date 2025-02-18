#!/usr/bin/env bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
cd "$SCRIPT_DIR"

TARGET_FILE="../README.md"

cat readme-intro.md > "$TARGET_FILE"

DTSMD="npx --no-install dtsmd --heading-offset 3 --links-file link-urls.json5"

echo "### TypeScript Types" >> "$TARGET_FILE"
$DTSMD typescript-types.d.ts >> "$TARGET_FILE"

echo "### API Functions" >> "$TARGET_FILE"
$DTSMD api-functions.d.ts >> "$TARGET_FILE"

npx prettier --write "$TARGET_FILE"
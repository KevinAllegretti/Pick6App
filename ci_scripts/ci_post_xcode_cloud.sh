#!/bin/sh
set -e
echo "=== POST XCODE CLOUD SCRIPT ==="
npm install
npx cap sync ios
echo "=== SCRIPT COMPLETED ==="
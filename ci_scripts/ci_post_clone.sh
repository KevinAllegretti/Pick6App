#!/bin/sh
set -e
echo "=== POST CLONE SCRIPT STARTING ==="
npm install
npx cap sync ios
echo "=== POST CLONE COMPLETED ==="
#!/bin/sh
echo "Installing npm dependencies..."
npm install

echo "Running Capacitor sync..."
npx cap sync ios

echo "Build script completed successfully"
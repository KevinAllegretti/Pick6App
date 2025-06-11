#!/bin/sh
echo "Running Capacitor sync..."
npm install
npx cap sync ios
echo "Capacitor sync completed"
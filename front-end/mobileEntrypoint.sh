#!/bin/sh
npm run apk
mv /app/android/app/build/outputs/apk/release/app-release.apk /app/apk/forgeflow.apk
exit

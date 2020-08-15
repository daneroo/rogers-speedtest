#!/usr/bin/env bash

HH=$(hostname)

mkdir -p ./data/speedtest/
while true; do 
    STAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    echo Testing speed for ${HH} at ${STAMP}
    speedtest-cli --json 2>/dev/null || echo "{ \"timestamp\": \"${STAMP}\", \"error\":true }" | tee ./data/speedtest/${HH}-${STAMP}.json
    sleep 30
done

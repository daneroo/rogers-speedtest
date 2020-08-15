#!/usr/bin/env bash

HH=$(hostname -f)

mkdir -p ./data/speedtest/
while true; do 
    STAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    echo Testing speed for ${HH} at ${STAMP}
    FILE="./data/speedtest/${HH}-${STAMP}.json"
    (speedtest-cli --json 2>/dev/null || echo "{ \"timestamp\": \"${STAMP}\", \"error\":true }") > ${FILE}
    cat ${FILE} | jq -r "[.timestamp,.download,.upload,.error]| @csv"
    sleep 260
done

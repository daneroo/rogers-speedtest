#!/usr/bin/env bash

FQDN=$(hostname -f)

mkdir -p ./data/speedtest/
mkdir -p ./data/ping/
while true; do 
    DAY=$(date -u +"%Y-%m-%d")
    STAMP=$(date -u +"%Y-%m-%dT%H.%M.%SZ")

    echo Testing ping for ${FQDN} at ${STAMP}
    FILE="./data/ping/${DAY}/${FQDN}-${STAMP}.json"
    mkdir -p $(dirname $FILE)
    (pingparsing -c 5 google.com 2>/dev/null || echo "{ \"timestamp\": \"${STAMP}\", \"error\":true }") > ${FILE}
    cat ${FILE} | jq '.["google.com"].packet_loss_rate'

    echo Testing speed for ${FQDN} at ${STAMP}
    FILE="./data/speedtest/${DAY}/${FQDN}-${STAMP}.json"
    mkdir -p $(dirname $FILE)
    (speedtest-cli --json 2>/dev/null || echo "{ \"timestamp\": \"${STAMP}\", \"error\":true }") > ${FILE}
    cat ${FILE} | jq -r "[.timestamp,.download,.upload,.error]| @csv"


    sleep 260
done

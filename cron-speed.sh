#!/usr/bin/env bash

# for cron
PATH="$PATH:/usr/local/bin"

FQDN=$(hostname -f)
DAY=$(date -u +"%Y-%m-%d")
STAMP=$(date -u +"%Y-%m-%dT%H.%M.%SZ")
FILE="./data/${FQDN}/speedtest/${DAY}/${FQDN}-${STAMP}.json"
mkdir -p $(dirname $FILE)

echo "Testing speed for ${FQDN} at ${STAMP}"
(speedtest-cli --json 2>/dev/null || echo "{ \"timestamp\": \"${STAMP}\", \"error\":true }") > ${FILE}


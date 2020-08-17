#!/usr/bin/env bash

FQDN=$(hostname -f)
DAY=$(date -u +"%Y-%m-%d")
STAMP=$(date -u +"%Y-%m-%dT%H.%M.%SZ")

echo Testing ping for ${FQDN} at ${STAMP}
pingparsing --indent 0 -c 5 -w 5 google.com speedtestslnt.rogers.com | jq

echo Testing speed for ${FQDN} at ${STAMP}
speedtest-cli --json | jq

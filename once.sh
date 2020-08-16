#!/usr/bin/env bash

FQDN=$(hostname -f)
DAY=$(date -u +"%Y-%m-%d")
STAMP=$(date -u +"%Y-%m-%dT%H.%M.%SZ")

echo Testing ping for ${FQDN} at ${STAMP}
pingparsing -c 5 google.com

echo Testing speed for ${FQDN} at ${STAMP}
speedtest-cli --json

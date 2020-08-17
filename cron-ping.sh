#!/usr/bin/env bash

PINGHOSTS="google.com speedtestslnt.rogers.com "
DURATION=300
UNAME="$(uname)"
case "${unameOut}" in
    Linux*)     TIMESTAMP=datetime;;
    Darwin*)    TIMESTAMP=none;;
    *)          TIMESTAMP=none;;
esac
# for cron
PATH="$PATH:/usr/local/bin"

FQDN=$(hostname -f)
DAY=$(date -u +"%Y-%m-%d")
STAMP=$(date -u +"%Y-%m-%dT%H.%M.%SZ")
FILE="./data/${FQDN}/ping/${DAY}/${FQDN}-${STAMP}.json"
mkdir -p $(dirname $FILE)


echo "Testing ping for ${FQDN} at ${STAMP}"
pingparsing --timestamp ${TIMESTAMP} \
  --indent 0 \
  -c ${DURATION} -w ${DURATION} \
  google.com speedtestslnt.rogers.com > ${FILE}


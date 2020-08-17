#!/usr/bin/env bash

PINGHOSTS="google.com speedtestslnt.rogers.com "
DURATION=300
UNAME="$(uname)"
case "${UNAME}" in
    Linux*)     TIMESTAMP=datetime;;
    Darwin*)    TIMESTAMP=none;;
    *)          TIMESTAMP=none;;
esac

# for MacOS cron : garbage elsewhere
if [ "${UNAME}" = "Darwin" ]; then
    echo "I am on MacOS (uname:${UNAME}): ts:${TIMESTAMP}"
    export PATH="/usr/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin"
fi


FQDN=$(hostname -f)
DAY=$(date -u +"%Y-%m-%d")
STAMP=$(date -u +"%Y-%m-%dT%H.%M.%SZ")
FILE="./data/${FQDN}/ping/${DAY}/${FQDN}-${STAMP}.json"
mkdir -p $(dirname $FILE)


echo "Testing ping (c,w:${DURATION},ts:${TIMESTAMP}) for ${FQDN} ($UNAME) at ${STAMP}"
/usr/local/bin/pingparsing \
  --indent 0 \
  --timestamp ${TIMESTAMP} \
  -c ${DURATION} -w ${DURATION} \
  google.com speedtestslnt.rogers.com > ${FILE}

retVal=$?
if [ $retVal -ne 0 ]; then
    echo "Error: ${retVal}"
fi

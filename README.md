# Service Availability - Speedtest

I ran some connectivity tests on Rogers (and Videtron for comparison) over a few days.

I ran:

- a ping test (300 pings in 300s) every 5 minutes
- speedtest-cli every 5 minutes

Google Sheets Summary: <https://docs.google.com/spreadsheets/d/1ZneQVmyKgvQLajOVIrnnWDM9Z5EYV0cGxdlZqQ2vSAk/edit?usp=sharing>

Notes: The host running on Rogers (bell.ts.imetrical.com was a seriously underpowered 8 year old chromebook - Acer Aspire ONE 532H-2223 - 10.1" - Atom N450 - 1 GB RAM - 160 GB HDD - BIOS release Date : 2010-01-30. It was updated to ubuntu 18.04 for this test.

The Videotron test was run on a Mac Mini (mid 2011)

## Sync back data to Dirac

```bash
rsync  -avz --progress piaget.ts.imetrical.com:Code/iMetrical/rogers-speedtest/data/ ./data/
rsync  -avz --progress bell.ts.imetrical.com:Code/iMetrical/rogers-speedtest/data/ ./data/
## Battery (on aspire/bell.ts.imetrical.com)

```bash
upower -i /org/freedesktop/UPower/devices/battery_BAT0
```

## Cron

```txt
# ping for 300s every 300s
*/5 * * * * cd ${HOME}/Code/iMetrical/rogers-speedtest; ./cron-ping.sh >> error-ping.log 2>&1
# run speedtest every 5 minutes
*/5 * * * * cd ${HOME}/Code/iMetrical/rogers-speedtest; ./cron-speed.sh >> error-speed.log 2>&1
```

## Ping

See <https://pypi.org/project/pingparsing/#cli-usage>

```bash
pingparsing --indent 0 -c 5 -w 5 google.com speedtestslnt.rogers.com
```

Out:
```bash
node parsePing.js | ./node_modules/.bin/json2csv > `hostname`.ping.csv
```

## Speedtest


```bash
speedtest-cli --json | jq
docker run  moutten/speedtest-cli

# Nice download only loop
while true; do echo $(date) - $(hostname) - $(speedtest --server 18556 --no-upload --json |jq '.download / 1e4 | floor|. / 100') Mb/s; sleep 60; done
```

Out:
```bash
node parseSpeed.js | ./node_modules/.bin/json2csv > `hostname`.speed.csv
```

## Incremental Analyze (Deprecated)

```bash
cat `find data/*/speedtest/ -name \*.json` | jq -r "[.timestamp,.download,.upload,.error]| @csv"

cat `find data/*/ping/ -name \*.json` | jq '.["google.com"].packet_loss_rate'
cat `find data/*/ping/ -name \*.json` | jq '.["speedtestslnt.rogers.com"].packet_loss_rate'

```

## Setup

### On Ubuntu

```bash
sudo apt-get install speedtest-cli jq

sudo apt install python3-pip
pip3 install pingparsing # as root
```

### On MacOs

```bash
brew install speedtest-cli jq

pip3 install pingparsing
```

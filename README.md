# Service Availability - Speedtest

## TODO

- Vis (nivo + netlify/vercel)
- Other tests,
  - iperf over tailscale
  - netdata
  - hey/loadimpact
  - nats heartbeat (plus nats-test)

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


## Speedtest


```bash
speedtest-cli --json | jq

```

Analyze

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
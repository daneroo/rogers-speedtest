# Service Availability - Speedtest

## TODO

- Could put in CRON */5
- Vis (nivo + netlify/vercel)
- Other tests,
  - iperf over tailscale
  - netdata
  - hey/loadimpact
  - nats heartbeat (plus nats-test)

## Ping

See <https://pypi.org/project/pingparsing/#cli-usage>

```bash
pingparsing -c 5 google.com
```
## Speedtest


```bash
speedtest-cli --json | jq

./loop.sh
```

Analyze

```bash
cat `find data/speedtest/ -name \*.json` | jq -r "[.timestamp,.download,.upload,.error]| @csv"

cat `find data/ping/ -name \*.json` | jq '.["google.com"].packet_loss_rate'
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
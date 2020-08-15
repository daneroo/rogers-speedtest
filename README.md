# Service Availability - Speedtest

## TODO

- Could put in CRON */5
- Vis (nivo + netlify/vercel)
- Other tests,
  - iperf over tailscale
  - netdata
  - hey/loadimpact
  - nats heartbeat (plus nats-test)

## Speedtest


```bash
speedtest-cli --json | jq

./loop.sh
```

Ouput

```bash
cat data/speedtest/*.json|jq -r "[.timestamp,.download,.upload,.error]| @csv"
```

## Setup

### On MacOs

```bash
brew install speedtest-cli jq
```
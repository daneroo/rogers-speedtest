# Service Availability - Speedtest

## TODO

- Could put in CRON */5
- Vis (nivo + netlify/vercel)
- Other tests,
  -  hey/loadimpact
  - nats heartbeat (plus nats-test)

## Speedtest


```bash
speedtest-cli --json | jq

./loop.sh
```

## Setup

### On MacOs

```bash
brew install speedtest-cli jq
```
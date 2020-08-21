const fs = require('fs');
const glob = require("glob")
const moment = require('moment')

// console.log('Parse SpeedTest and Ping data')

// data/piaget.lan/speedtest/2020-08-19/piaget.lan-2020-08-19T07.40.00Z.json
// data/piaget.lan/ping/2020-08-17/piaget.lan-2020-08-17T14.00.00Z.json
const files = glob.sync("data/**/ping/**/*.json", {})
// console.log(files.length)

const pings = files.map(path => {
    const [data, host, test, day, file] = path.split('/')
    return { data, host, test, day, file, path }
}).filter(d => d.test === 'ping')

// const pingline = {
//     "google.com": { "destination": "google.com", "packet_transmit": 275, "packet_receive": 273, "packet_loss_count": 2, "packet_loss_rate": 0.7272727272727273, "rtt_min": 10.162, "rtt_avg": 26.056, "rtt_max": 140.007, "rtt_mdev": 19.942, "packet_duplicate_count": 0, "packet_duplicate_rate": 0 },
//     "speedtestslnt.rogers.com": { "destination": "speedtestslnt.rogers.com", "packet_transmit": 275, "packet_receive": 273, "packet_loss_count": 2, "packet_loss_rate": 0.7272727272727273, "rtt_min": 21.118, "rtt_avg": 40.718, "rtt_max": 150.738, "rtt_mdev": 21.791, "packet_duplicate_count": 0, "packet_duplicate_rate": 0 }
// }

// const header = ['day', 'stamp', 'host', 'destination', 'packet_transmit', 'packet_receive', 'packet_loss_count', 'packet_loss_rate']
// console.log(JSON.stringify(header))
const lines = []
for (d of pings) {
    // console.log(JSON.stringify(d))
    const { data, host, test, day, file, path } = d
    const utcStamp = file.match(/[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}.[\d]{2}.[\d]{2}Z/)[0].replace(/\./g, ':')
    const stamp = moment(utcStamp).format('YYYY-MM-DD HH:mm:ss')
    // console.log(utcStamp, stamp)
    try {
        const pinglines = JSON.parse(fs.readFileSync(path))
        // console.log(JSON.stringify(pinglines))
        // map of {host:{destination:host,...}}
        for (const [destination, ping] of Object.entries(pinglines)) {
            // console.log(JSON.stringify(ping))
            const { packet_transmit, packet_receive, packet_loss_count, packet_loss_rate } = ping
            const line = { day, stamp, host, destination, packet_transmit, packet_receive, packet_loss_count, packet_loss_rate }
            // console.log(JSON.stringify(line))
            lines.push(line)
        }
    } catch (error) {
        // console.log(path, error)
    }
}
console.log(JSON.stringify(lines))


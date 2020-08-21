const fs = require('fs');
const glob = require("glob")
const moment = require('moment')

// console.log('Parse SpeedTest and Ping data')

// data/piaget.lan/speedtest/2020-08-19/piaget.lan-2020-08-19T07.40.00Z.json
// data/piaget.lan/ping/2020-08-17/piaget.lan-2020-08-17T14.00.00Z.json
const files = glob.sync("data/**/speedtest/**/*.json", {})
// console.log(files.length)

const speeds = files.map(path => {
    const [data, host, test, day, file] = path.split('/')
    return { data, host, test, day, file, path }
}).filter(d => d.test === 'speedtest')

const lines = []
for (d of speeds) {
    // console.log(JSON.stringify(d))
    const { data, host, test, day, file, path } = d
    const utcStamp = file.match(/[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}.[\d]{2}.[\d]{2}Z/)[0].replace(/\./g, ':')
    const stamp = moment(utcStamp).format('YYYY-MM-DD HH:mm:ss')

    try {
        // const example = {
        //     "client":
        //         { "rating": "0", "loggedin": "0", "isprating": "3.7", "ispdlavg": "0", "ip": "96.20.158.44", "isp": "Videotron Ltee", "lon": "-75.7398", "ispulavg": "0", "country": "CA", "lat": "45.4448" }, "bytes_sent": 29523968, "download": 132944594.51876065, "timestamp": "2020-08-21T16:05:01.578420Z", "share": null, "bytes_received": 166574956, "ping": 29.57, "upload": 22738365.14777668, "server": { "latency": 29.57, "name": "Ottawa, ON", "url": "http://otw23spd01.srvr.bell.ca:8080/speedtest/upload.php", "country": "Canada", "lon": "-75.7000", "cc": "CA", "host": "otw23spd01.srvr.bell.ca:8080", "sponsor": "Bell Canada", "lat": "45.4167", "id": "17396", "d": 4.405510924652971 }
        // }
        const speedtest = JSON.parse(fs.readFileSync(path))
        delete speedtest.client
        delete speedtest.server
        // console.log(speedtest)
        const line = { day, stamp, host, ...speedtest }
        // console.log(JSON.stringify(line))
        lines.push(line)
    } catch (error) {
        console.log(path, error)
    }
}
console.log(JSON.stringify(lines))

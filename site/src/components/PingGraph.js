import React from 'react'
import { useThemeUI } from 'theme-ui'
import { LineCanvas as Line } from '@nivo/line'
// import { Line } from '@nivo/line'

import pings from './data/pings.json'

const provider = {
  'bell.ts.imetrical.com': 'Rogers',
  'piaget.lan': 'Videotron'
}
export default function PingGraph ({
  host = 'bell.ts.imetrical.com',
  destination = 'speedtestslnt.rogers.com',
  start = '2020-08-17',
  end = '2020-08-21'
}) {
  const { theme: { colors: { primary, secondary, text } } } = useThemeUI()
  const data = pings.filter(o => o.host === host && o.destination === destination && o.day >= start && o.day <= end)
  const width = 320
  const height = 320
  // For <pre>
  // const rows = data.map((o, i) => <li key={i}>{o.stamp} - {o.packet_loss_rate}</li>)

  // nivo needs {x,y} pars
  const nivoData = [{
    id: 'line', // needed for legends
    data: data.map((o, i) => {
      return { x: o.stamp, y: Math.max(0.1, o.packet_loss_rate) }
    })
  }]

  const nivoTheme = {
    color: {
      text: text,
      point: secondary,
      tickAndGrid: text,
      line: primary
    }
  }

  const commonProperties = {
    width,
    height,
    // add margin for axis labels
    margin: { top: 20, right: 20, bottom: 40, left: 60 },
    animate: true,
    colors: [nivoTheme.color.line],
    lineWidth: 0.1,
    theme: {
      background: 'transparent',
      // fontFamily: 'sans-serif',
      fontSize: 12,
      textColor: nivoTheme.color.text,
      axis: {
        ticks: {
          line: {
            stroke: nivoTheme.color.tickAndGrid,
            strokeWidth: 0.7
          }
        },
        legend: {
          text: {
            fontSize: 14,
            color: 'red'
          }
        }
      },
      grid: {
        line: {
          stroke: nivoTheme.color.tickAndGrid,
          strokeWidth: 0.7
        }
      }
    }
  }

  return (
    <div>
      <h4>Ping - {provider[host]}</h4>
      <Line
        {...commonProperties}
        data={nivoData}
        xFormat='time:%Y-%m-%d %H:%M:%S'
        xScale={{
          type: 'time',
          format: '%Y-%m-%d %H:%M:%S',
          // ...xScale, // min,max
          useUTC: false,
          precision: 'minute'
        }}
        axisBottom={{
          format: '%b %d', // %H:%M
          tickValues: 'every 1 days',
          tickSize: 10
          // tickRotation: -45
          // legend: 'Time',
          // legendOffset: -12
        }}

        yScale={{
          // type: 'linear',
          type: 'log',
          base: 2,
          min: 0.1,
          max: 85
        }}
        gridYValues={[1, 10, 100]}

        axisLeft={{
          // tickValues: 5,
          tickValues: [1, 10, 100],
          legend: 'packet loss (%) log',
          legendOffset: -45
        }}

      />
      {/* <pre>{rows}</pre> */}
    </div>
  )
}

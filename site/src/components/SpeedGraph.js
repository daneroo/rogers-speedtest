import React from 'react'
import { useThemeUI } from 'theme-ui'
import { LineCanvas as Line } from '@nivo/line'

// node parsePing.js >site/src/components/data/pings.json
import speeds from './data/speeds.json'

const provider = {
  'bell.ts.imetrical.com': 'Rogers',
  'piaget.lan': 'Videotron'
}

export default function SpeedGraph ({
  host = 'bell.ts.imetrical.com',
  metric = 'download'
  // day = '2020-08-17'
}) {
  const { theme: { colors: { primary, secondary, text } } } = useThemeUI()
  const data = speeds.filter(o => o.host === host && o.error !== true)
  const width = 320
  const height = 320

  // For <pre>
  // const rows = data.map((o, i) => <li key={i}>{o.stamp} - {o[metric]}</li>)

  // nivo needs {x,y} pars
  const nivoData = [{
    id: 'line', // needed for legends
    data: data.map((o, i) => {
      return { x: o.stamp, y: o[metric] / 1e6 }
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
      <h4>Speed Test - {provider[host]}</h4>
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
          type: 'linear',
          min: '0',
          max: '150'
        }}
        axisLeft={{
          tickValues: 5,
          legend: `${metric} (Mb/s)`,
          legendOffset: -45
        }}

      />
      {/* <pre>{rows}</pre> */}
    </div>
  )
}

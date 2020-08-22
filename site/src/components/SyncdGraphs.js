import React, { } from 'react'
import { Flex } from 'theme-ui'

import SpeedGraph from './SpeedGraph'
import PingGraph from './PingGraph'

export default function SyncdGraphs () {
  // const days = ['2020-08-17', '2020-08-18', '2020-08-19', '2020-08-20', '2020-08-21']
  // const [day, setDay] = useState(days[0])
  return (
    <div>
      {/* <Flex mb={3}>
        <Label htmlFor='frameIsGrid'>Day</Label>
        {days.map((d, i) => (
          <Label key={i}>
            <Radio checked={d === day} value onChange={(e) => setDay(d)} name='frameIsGrid' /> Aug {new Date(d).getDate()}
          </Label>
        ))}
      </Flex> */}

      <Flex mb={3}>
        <SpeedGraph host='bell.ts.imetrical.com' />
        <SpeedGraph host='piaget.lan' />
      </Flex>
      <Flex mb={3}>
        <PingGraph host='bell.ts.imetrical.com' />
        <PingGraph host='piaget.lan' />

      </Flex>

    </div>
  )
}

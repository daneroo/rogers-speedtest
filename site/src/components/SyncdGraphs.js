import React, { useState } from 'react'
import { Flex, Label, Radio } from 'theme-ui'
import moment from 'moment'

import SpeedGraph from './SpeedGraph'
import PingGraph from './PingGraph'

export default function SyncdGraphs () {
  const ranges = [['2020-08-17', '2020-08-21'], ['2020-08-17', '2020-08-18'], ['2020-08-19', '2020-08-21']]
  const [rangeIndex, setRangeIndex] = useState(0)
  const [start, end] = ranges[rangeIndex]
  console.log(moment(start).format('D'), moment(end).format('D'))
  return (
    <div>
      <Flex mb={3}>
        <Label htmlFor='frameIsGrid'>Days</Label>
        {ranges.map(([start, end], i) => (
          <Label key={i}>
            <Radio checked={i === rangeIndex} value onChange={(e) => setRangeIndex(i)} name='frameIsGrid' />
            Aug {moment(start).format('D')} - {moment(end).format('D')}
          </Label>
        ))}
      </Flex>

      <Flex mb={3}>
        <SpeedGraph host='bell.ts.imetrical.com' {...{ start, end }} />
        <SpeedGraph host='piaget.lan' {...{ start, end }} />
      </Flex>
      <Flex mb={3}>
        <PingGraph host='bell.ts.imetrical.com' {...{ start, end }} />
        <PingGraph host='piaget.lan' {...{ start, end }} />

      </Flex>

    </div>
  )
}

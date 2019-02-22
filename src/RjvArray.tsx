import * as React from 'react'
import Rjv from './Rjv'

const RjvArray: React.SFC<any> = props => {
  const { data } = props

  const keys = []

  for (let i = 0; i < data.length; i++) {
    keys.push(i)
  }

  return keys.map(key => (
    <Rjv key={key} keyName={key} data={data[key]} />
  )) as any
}

export default RjvArray

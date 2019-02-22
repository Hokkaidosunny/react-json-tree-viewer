import * as React from 'react'
import Rjv from './Rjv'

const RjvObject: React.SFC<any> = props => {
  const { data, ...otherProps } = props

  const keys = Object.keys(data)

  return keys.map(key => (
    <Rjv key={key} keyName={key} data={data[key]} {...otherProps} />
  )) as any
}

export default RjvObject

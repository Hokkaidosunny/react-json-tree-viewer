import * as React from 'react'
import { ArrowSpan } from './ui'

interface Props {
  isExpanded: boolean
  ifShow: boolean
  [x: string]: any
}

const Arrow: React.SFC<Props> = props => {
  const { isExpanded, ifShow, ...otherProps } = props

  if (!ifShow) {
    return <ArrowSpan style={{ visibility: 'hidden' }}>▶</ArrowSpan>
  }

  return isExpanded ? (
    <ArrowSpan {...otherProps}>▼</ArrowSpan>
  ) : (
    <ArrowSpan {...otherProps}>▶</ArrowSpan>
  )
}

export default Arrow

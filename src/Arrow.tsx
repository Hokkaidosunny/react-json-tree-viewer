import * as React from 'react'
import { ArrowSpan } from './ui'

interface Props {
  isCollapsed: boolean
  ifShow: boolean
  [x: string]: any
}

const Arrow: React.SFC<Props> = props => {
  const { isCollapsed, ifShow, ...otherProps } = props

  if (!ifShow) {
    return <ArrowSpan style={{ visibility: 'hidden' }}>▶</ArrowSpan>
  }

  return isCollapsed ? (
    <ArrowSpan {...otherProps}>▶</ArrowSpan>
  ) : (
    <ArrowSpan {...otherProps}>▼</ArrowSpan>
  )
}

export default Arrow

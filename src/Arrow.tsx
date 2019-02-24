import * as React from 'react'
import { ArrowSpan } from './ui'

interface Props {
  isExpanded: boolean
  ifShow: boolean
  [x: string]: any
}

const Arrow: React.SFC<Props> = props => {
  const { isExpanded, ifShow, style, ...otherProps } = props

  if (!ifShow) {
    return <ArrowSpan style={{ visibility: 'hidden', ...style }}>▶</ArrowSpan>
  }

  const ownStyle = isExpanded
    ? { transform: 'rotate(90deg)' }
    : { transform: 'rotate(0deg)' }

  const _style = {
    ...style,
    ...ownStyle
  }

  return (
    <ArrowSpan {...otherProps} style={_style}>
      ▶
    </ArrowSpan>
  )
}

export default Arrow

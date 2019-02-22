import * as React from 'react'
import _ from 'lodash'
import RjvArray from './RjvArray'
import RjvObject from './RjvObject'
import Arrow from './Arrow'
import { KeySpan, NumberSpan, StringSpan, NullSpan, Row } from './ui'

interface RjvProps {
  data: object
  hideRoot?: boolean
  keyName?: string | number
}

class Rjv extends React.Component<RjvProps, any> {
  state = {
    isCollapsed: false
  }

  toggleCollapsed = () => {
    const { isCollapsed } = this.state
    this.setState({ isCollapsed: !isCollapsed })
  }

  renderValueByType = (data: any) => {
    let $value = null

    if (_.isString(data)) {
      $value = <StringSpan>"{data}"</StringSpan>
    }

    if (_.isNumber(data)) {
      $value = <NumberSpan>{data}</NumberSpan>
    }

    if (_.isNull(data)) {
      $value = <NullSpan>null</NullSpan>
    }

    if (_.isObject(data)) {
      $value = <RjvObject data={data} />
    }

    if (_.isArray(data)) {
      $value = <RjvArray data={data} />
    }

    return $value
  }

  getIfShowArrow = (data: any) => {
    return _.isArray(data) || _.isObject(data)
  }

  render() {
    const { isCollapsed } = this.state
    const { keyName, data, hideRoot } = this.props

    const _keyName = keyName || 'Root'

    const ifShowArrow = this.getIfShowArrow(data)

    const $arrow = (
      <Arrow
        isCollapsed={isCollapsed}
        ifShow={ifShowArrow}
        onClick={this.toggleCollapsed}
      />
    )

    const $key = <KeySpan>{_keyName} </KeySpan>

    const $value = this.renderValueByType(data)

    if (hideRoot && _keyName === 'Root') {
      return $value
    }

    return (
      <Row>
        <div>{$arrow}</div>
        <div>
          {$key}
          {isCollapsed ? null : $value}
        </div>
      </Row>
    )
  }
}

export default Rjv

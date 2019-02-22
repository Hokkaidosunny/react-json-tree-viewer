import * as React from 'react'
import _ from 'lodash'
import RjvArray from './RjvArray'
import RjvObject from './RjvObject'
import Arrow from './Arrow'
import { KeySpan, NumberSpan, StringSpan, NullSpan, Row } from './ui'

interface RjvProps {
  data: object
  hideRoot?: boolean
  keyName?: string
  shouldExpandNode?: Function
  path?: string[]
  onArrowClick?: Function
  labelRenderer?: Function
  valueRenderer?: Function
  arrowStyle?: React.CSSProperties
}

class Rjv extends React.Component<RjvProps, any> {
  state = {
    isExpanded: true
  }

  componentDidMount() {
    const isExpanded = this.shouldExpandNode()

    this.setState({
      isExpanded
    })
  }

  shouldExpandNode = () => {
    const { shouldExpandNode, data } = this.props

    const ifNeedExpand = this.getIfNendExpand()
    const currentPath = this.getCurrentPath()

    if (shouldExpandNode && ifNeedExpand) {
      return shouldExpandNode(currentPath, data)
    }

    return true
  }

  getCurrentPath = () => {
    const { path, keyName } = this.props

    let currentPath: string[] = path || []

    if (keyName) {
      currentPath = [...currentPath, keyName]
    }

    return currentPath
  }

  toggleIsExpanded = () => {
    const { isExpanded } = this.state
    const { onArrowClick } = this.props

    const currentPath = this.getCurrentPath()

    this.setState({ isExpanded: !isExpanded }, () => {
      if (onArrowClick) {
        onArrowClick(currentPath, this.state.isExpanded)
      }
    })
  }

  getPassedProps = () => {
    const passedProps = _.pick(this.props, [
      'shouldExpandNode',
      'onArrowClick',
      'labelRenderer',
      'valueRenderer',
      'arrowStyle'
    ])

    return passedProps
  }

  renderValueByType = () => {
    const { data, valueRenderer } = this.props

    const currentPath = this.getCurrentPath()

    const passedProps = this.getPassedProps()

    let $value = null

    if (_.isString(data)) {
      $value = <StringSpan>"{data}"</StringSpan>

      if (valueRenderer) {
        $value = valueRenderer(data)
      }
    }

    if (_.isNumber(data)) {
      $value = <NumberSpan>{data}</NumberSpan>

      if (valueRenderer) {
        $value = valueRenderer(data)
      }
    }

    if (_.isNull(data)) {
      $value = <NullSpan>null</NullSpan>

      if (valueRenderer) {
        $value = valueRenderer(data)
      }
    }

    if (_.isObject(data)) {
      $value = <RjvObject data={data} path={currentPath} {...passedProps} />
    }

    if (_.isArray(data)) {
      $value = <RjvArray data={data} path={currentPath} {...passedProps} />
    }

    return $value
  }

  getIfNendExpand = () => {
    const { data } = this.props
    return _.isArray(data) || _.isObject(data)
  }

  render() {
    const { isExpanded } = this.state
    const { keyName, hideRoot, labelRenderer, arrowStyle = {} } = this.props

    const _keyName = keyName || 'Root'

    const ifNeedExpand = this.getIfNendExpand()

    // arrow
    const $arrow = (
      <Arrow
        isExpanded={isExpanded}
        ifShow={ifNeedExpand}
        onClick={this.toggleIsExpanded}
        style={arrowStyle}
      />
    )

    // label
    const $key = labelRenderer ? (
      labelRenderer(_keyName)
    ) : (
      <KeySpan>{_keyName}: </KeySpan>
    )

    // value
    const $value = this.renderValueByType()

    if (hideRoot && _keyName === 'Root') {
      return $value
    }

    return (
      <Row>
        <div>{$arrow}</div>
        <div>
          {$key}
          {ifNeedExpand && !isExpanded ? null : $value}
        </div>
      </Row>
    )
  }
}

export default Rjv

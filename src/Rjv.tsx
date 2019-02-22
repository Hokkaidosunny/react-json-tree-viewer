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
    const passedProps = _.pick(this.props, ['shouldExpandNode', 'onArrowClick'])
    return passedProps
  }

  renderValueByType = () => {
    const { data } = this.props

    const currentPath = this.getCurrentPath()

    const passedProps = this.getPassedProps()

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
    const { keyName, data, hideRoot } = this.props

    const _keyName = keyName || 'Root'

    const ifNeedExpand = this.getIfNendExpand()

    const $arrow = (
      <Arrow
        isExpanded={isExpanded}
        ifShow={ifNeedExpand}
        onClick={this.toggleIsExpanded}
      />
    )

    const $key = <KeySpan>{_keyName} </KeySpan>

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

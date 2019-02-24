import * as React from 'react'
import _ from 'lodash'
import RjvArray from './RjvArray'
import RjvObject from './RjvObject'
import Arrow from './Arrow'
import {
  KeySpan,
  NumberSpan,
  StringSpan,
  NullSpan,
  BooleanSpan,
  ObjectTypeSpan,
  ArrayTypeSpan,
  Row,
  Col
} from './ui'

interface RjvProps {
  data: object
  hideRoot?: boolean
  keyName?: string
  shouldExpandNode?: Function
  path?: string[]
  onArrowClick?: Function
  labelRenderer?: Function
  valueRenderer?: Function
  typeRenderer?: Function
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
      'typeRenderer',
      'arrowStyle'
    ])

    return passedProps
  }

  renderValueByType = () => {
    const { data, valueRenderer, typeRenderer } = this.props

    const currentPath = this.getCurrentPath()

    const passedProps = this.getPassedProps()

    let $value = null
    let $type = null
    let type = null

    if (_.isString(data)) {
      type = 'string'
      $value = <StringSpan>"{data}"</StringSpan>
    }

    if (_.isBoolean(data)) {
      type = 'boolean'
      $value = <BooleanSpan>{String(data)}</BooleanSpan>
    }

    if (_.isNumber(data)) {
      type = 'number'
      $value = <NumberSpan>{data}</NumberSpan>
    }

    if (_.isNull(data)) {
      type = 'null'
      $value = <NullSpan>null</NullSpan>
    }

    if (_.isObject(data)) {
      type = 'object'
      $value = <RjvObject data={data} path={currentPath} {...passedProps} />
      $type = (
        <ObjectTypeSpan>{`{} ${Object.keys(data).length} keys`}</ObjectTypeSpan>
      )
    }

    if (_.isArray(data)) {
      type = 'array'
      $value = <RjvArray data={data} path={currentPath} {...passedProps} />
      $type = <ArrayTypeSpan>{`[] ${data.length} items`}</ArrayTypeSpan>
    }

    // custom value render
    if (type !== 'object' && type !== 'array' && valueRenderer) {
      $value = valueRenderer(data)
    }

    // custom type render
    if ((type === 'object' || type === 'array') && typeRenderer) {
      $type = typeRenderer(data)
    }

    return {
      $type,
      $value
    }
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

    // key
    let $key = <KeySpan>{_keyName}: </KeySpan>

    // custom key
    if (labelRenderer) {
      $key = labelRenderer(_keyName)
    }

    // value
    const { $type, $value } = this.renderValueByType()

    if (hideRoot && _keyName === 'Root') {
      return $value
    }

    return (
      <Row>
        <Col>{$arrow}</Col>
        <Col>
          {$key}
          {$type}
          {ifNeedExpand && !isExpanded ? null : $value}
        </Col>
      </Row>
    )
  }
}

export default Rjv

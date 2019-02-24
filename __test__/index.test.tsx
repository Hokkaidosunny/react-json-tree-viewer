import * as React from 'react'
import Rjv from '../lib'
import { mount } from 'enzyme'
import Arrow from '../lib/Arrow'

test('Rjv props be called', () => {
  const json = {
    a: '1'
  }

  const props = {
    onArrowClick: jest.fn(),
    shouldExpandNode: jest.fn(),
    labelRenderer: jest.fn(),
    valueRenderer: jest.fn(),
    typeRenderer: jest.fn()
  }

  const wrapper = mount(<Rjv data={json} {...props} />)

  wrapper.find(Arrow).simulate('click')

  expect(props.onArrowClick).toBeCalled()
  expect(props.shouldExpandNode).toBeCalled()
  expect(props.labelRenderer).toBeCalled()
  expect(props.valueRenderer).toBeCalled()
  expect(props.typeRenderer).toBeCalled()
})

import * as React from 'react'
import Rjv from '../lib'
import { shallow } from 'enzyme'

test('Rjv', () => {
  const json = {
    a: '1'
  }

  const wrapper = shallow(<Rjv data={json} />)
})

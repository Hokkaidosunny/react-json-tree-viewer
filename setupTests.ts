import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as jsdom from 'jsdom'

const { window } = new jsdom.JSDOM('<!doctype html><html><body></body></html>')

global.window = window
global.document = window.document

configure({ adapter: new Adapter() })

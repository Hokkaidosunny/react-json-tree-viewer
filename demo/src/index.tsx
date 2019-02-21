import * as React from 'react'
import * as ReactDOM from 'react-dom'

class App extends React.Component {
  render() {
    return <div>hello world</div>
  }
}

const rootElement = document.getElementById('root')

ReactDOM.render(<App />, rootElement)

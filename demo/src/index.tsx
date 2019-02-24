import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Rjv from '../../src'

class App extends React.Component {
  render() {
    const data = {
      riskDogBean: {
        ip_province: '上海',
        status: '200',
        review_content: null,
        testRuleResultMap: {},
        timestamp: '2019-02-21 20:04:53.744',
        uid: '7313761571385',
        judgement: 'PASS',
        data: '"{}"',
        anti_spider: '200',
        anti_spider_inner: '0',
        anti_content: '0al*',
        reliableList: [1, 2]
      },
      fingerPrintBean: null
    }

    const data1 = {
      a: {
        a: 1
      }
    }

    const json = {
      array: [1, 2, 3],
      bool: true,
      object: {
        foo: 'bar'
      }
    }

    return (
      <div>
        <Rjv
          data={json}
          hideRoot
          // shouldExpandNode={(path: string[]) => {
          //   return path.length <= 1
          // }}
          typeRenderer={() => {
            console.log(111)
          }}
          onArrowClick={(path: string[], expanded) => {
            console.log(path, expanded)
          }}
          // labelRenderer={raw => {
          //   return <span>{raw} - </span>
          // }}
          valueRenderer={raw => {
            return <strong>{String(raw)}</strong>
          }}
          // arrowStyle={{
          //   color: 'red'
          // }}
        />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')

ReactDOM.render(<App />, rootElement)

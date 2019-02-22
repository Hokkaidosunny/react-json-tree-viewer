import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Rjv from '../../src'

class App extends React.Component {
  render() {
    const data = {
      riskDogBean: {
        mobile_province: null,
        mobile_city: null,
        ip_province: '上海',
        ip_city: '上海',
        eventTime_String: '2019-02-21 20:04:47',
        batch_id: null,
        address: null,
        avatar: null,
        raw_avatar: null,
        checkpoint: 'cp_piggy_box',
        city: null,
        discount_amount: null,
        event_id: 'd6c739442d5f4dbe89b018885d100cae',
        event_type: null,
        goods_id: null,
        goods_num: null,
        group_order_id: null,
        internal_status: '0',
        ip: '180.168.51.102',
        log_type: 'riskConsult',
        login_app_id: '1',
        mall_id: null,
        matchrouter: 'rt_piggy_box_collect',
        mobile: null,
        msg: '通过',
        nickname: null,
        onlineRuleResultMap: {},
        order_amount: null,
        order_sn: null,
        othersMap: null,
        owner_mobile: null,
        pay_app_id: null,
        pdd_app_name: 'risk-control-api',
        pdd_id: null,
        pdd_log_id: 'c5ebfbad-4757-428f-961d-04bbf2ac958b',
        pdd_log_tag: 'pdd-risk-control',
        pdd_log_time: '1550750687020',
        platform: null,
        province: null,
        status: '200',
        review_content: null,
        talk_content: null,
        testRuleResultMap: {},
        timestamp: '2019-02-21 20:04:53.744',
        uid: '7313761571385',
        judgement: 'PASS',
        id_card: null,
        data: '"{}"',
        anti_spider: '200',
        anti_spider_inner: '0',
        anti_content: '0al*',
        reliableList: []
      },
      fingerPrintBean: null
    }

    const data1 = {
      a: {
        a: 1
      }
    }

    return (
      <div>
        <Rjv
          data={data}
          hideRoot
          shouldExpandNode={(path: string[]) => {
            return path.length <= 1
          }}
          onArrowClick={(path: string[], expanded) => {
            console.log(path, expanded)
          }}
        />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')

ReactDOM.render(<App />, rootElement)

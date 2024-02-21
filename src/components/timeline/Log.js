import React, {Component} from 'react'
import {LogScript, LogChangeBid, LogChangeState} from './'

import style from './styles/Log.module.scss'

class Log extends Component {
  render() {
    const {type = 'type is not set', log} = this.props
    switch(type) {
      case 'script':
        return <LogScript log={log} />
      case 'change_bid':
        return <LogChangeBid log={log} />
      case 'change_state':
        return <LogChangeState log={log} />
      default:
        return <div className={style.normal}>Unknown log type: <strong className={style.strong}>{type}</strong>.</div>
    }
  }
}

export default Log

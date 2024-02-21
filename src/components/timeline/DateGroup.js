import React, {Component} from 'react'
import {Log} from './'

import style from './styles/DateGroup.module.scss'

class DateGroup extends Component {
  render() {
    const {group} = this.props
    return (
      <div className={style.normal}>
        <h2 className={style.day}>{group.date}</h2>
        <ul className={style.logs}>
          {group.items.map((log, i) => (
            <li className={style.logsItem} key={i}>
              <span className={style.logsTime}>{log.created.slice(11,16)}</span>
              <Log type={log.type} log={log} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default DateGroup

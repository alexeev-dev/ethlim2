import React, {Component} from 'react'

import style from './styles/LogScript.module.scss'

class LogScript extends Component {
  render() {
    const {log} = this.props
    return (
      <div className={style.normal}>
        <h3 className={style.title}>Total scripts :  {log.script_name}</h3>
        <ul className={style.list}>
          <li className={style.listItem}>Objects created :  {log.objects_created || 0}</li>
          <li className={style.listItem}>Objects updated : {log.objects_updated || 0}</li>
        </ul>
      </div>
    )
  }
}

export default LogScript

import React, {Component} from 'react'

import {Icon} from 'components/utility'

import style from './styles/UserInfo.module.scss'

class UserInfo extends Component {
  render() {
    const {ava = '/assets/img/default_ava.png', name, email, stats} = this.props
    return (
      <div className={style.normal}>
        <div className={style.ava}>
          <figure className={style.avaFigure}>
            <img className={style.avaImg} src={ava} alt="User"/>
          </figure>
          <button className={style.avaEdit}>
            <Icon className={style.avaIcon} icon="cog" />
          </button>
        </div>
        <div className={style.name}>
          <h4 className={style.nameUser}>{name}</h4>
          <button className={style.nameEdit}><Icon className={style.nameIcon} icon="create" /></button>
        </div>
        <p className={style.email}>{email}</p>
        <button className={style.pass}>
          <Icon className={style.passIcon} icon="security" />
          <span className={style.passText}>change password</span>
        </button>
        <ul className={style.stats}>
          {stats.map((s, i) => (
            <li key={i} className={style.statsItem}>
              <p className={style.statsValue}>{s.value}</p>
              <span className={style.statsLabel}>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default UserInfo

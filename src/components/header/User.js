import React, {Component} from 'react'

import {Icon} from 'components/utility'

import style from './styles/User.module.scss'

class User extends Component {
  handleUser = event => {
    event.preventDefault()
    const {onUser} = this.props

    if (typeof onUser === 'function') {
      onUser('user')
    }
  }

  handleClick = event => {
    event.preventDefault()
    const {onClick} = this.props
    const name = event.target.getAttribute('data-name')

    if (typeof onClick === 'function') {
      onClick(name)
    }
  }

  render() {
    const {avatar = '/assets/img/default_ava.png'} = this.props
    return (
      <div className={style.normal}>
        <ul className={style.notification}>
          <li className={style.notificationItem}>
            <button className={style.notificationButton} data-name="messages" onClick={this.handleClick}>
              <Icon icon="email" className={style.icon} />
            </button>
          </li>
          <li className={style.notificationItem}>
            <button className={style.notificationButton} data-name="notifications" onClick={this.handleClick}>
              <Icon icon="notifications" className={style.icon} />
            </button>
          </li>
        </ul>
        <button className={style.user} onClick={this.handleUser}>
          <img className={style.avatar} src={avatar} alt="User"/>
        </button>
      </div>
    )
  }
}

export default User

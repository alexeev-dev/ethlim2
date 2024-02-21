import React, {Component} from 'react'

import style from './styles/LogChangeState.module.scss'

class LogChangeState extends Component {
  render() {
    const {user, ad, current_state, breadcrumbs} = this.props.log
    // const avatar = '/assets/img/default_ava.png'
    return (
      <div className={style.normal}>
        <div className={style.state}>
          <div className={style.stateInfo}>
            <p className={style.stateComment}>{ad.ext_id}</p>
            <p className={style.stateSource}>{
              breadcrumbs.length === 0
              ? '-'
              : breadcrumbs.join(' >> ')
            }</p>
          </div>
          <span className={`${style.stateCurrent} ${style[current_state]}`}></span>
        </div>
        <div className={style.user}>
          <div className={style.userAva}>
            {/* <figure className={style.userImage}>
              <img src={avatar}/>
            </figure> */}
            <span className={style.userStatus}></span>
          </div>
          <div className={style.userInfo}>
            <p className={style.userName}>{user.username}</p>
            <span className={style.userChanges}>-</span>
          </div>
        </div>
      </div>
    )
  }
}

export default LogChangeState

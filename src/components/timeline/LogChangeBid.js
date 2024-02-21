import React, {Component} from 'react'
import {Icon} from 'components/utility'

import style from './styles/LogChangeBid.module.scss'

class LogChangeBid extends Component {
  render() {
    const {user, message, bid_value, bid_difference, breadcrumbs} = this.props.log
    const {phrases = [1]} = this.props.log
    // const avatar = '/assets/img/default_ava.png'
    const bidDiff = Math.round(bid_difference * 100) / 100
    const icon = bidDiff >= 0
      ? 'arrow-up'
      : 'arrow-down'
    return (
      <div className={style.normal}>
        <div className={style.bid}>
          <div className={style.bidChange}>
            <p className={style.bidNew}>{bid_value} р.</p>
            <p className={style.bidDiff}>{bidDiff !== 0 && <Icon icon={icon} className={style[icon]} />} {bidDiff} р.</p>
          </div>
          <div className={style.bidInfo}>
            <p className={style.bidComment}>{message}</p>
            <p className={style.bidSource}>{
              breadcrumbs.length === 0
                ? '-'
                : breadcrumbs.join(' >> ')
            }</p>
            <p className={style.bidComment} style={{marginTop: '15px'}}>{
              `Total ${phrases.length} modifications`
            }</p>
          </div>
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

export default LogChangeBid

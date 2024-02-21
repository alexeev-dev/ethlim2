import React, {Component} from 'react'

import {Links} from './'

import style from './styles/Footer.module.scss'

import {pages, payment} from './consts'

class Footer extends Component {
  render() {
    const {isProjectSelected} = this.props
    return (
      <div className={style.normal}>
        <div className={style.copy}>
          <p className={style.copyText}>&copy; 2020 <span className={style.copySpan}>&mdash; Ethlim</span></p>
        </div>
        <div className={style.links}>
          {<div className={style.linksLeft}>
            <Links links={pages.left} />
          </div>}
          {isProjectSelected && <div className={style.linksRight}>
            <Links links={pages.right} />
          </div>}
        </div>
        <div className={style.payment}>
          <ul className={style.paymentList}>
            {payment.map(p => (
              <li key={p} className={style.paymentItem}>
                <img className={style.paymentImg} src={`/assets/img/payment-${p}.png`} alt={p}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer

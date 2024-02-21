import React from 'react'
// import {Link} from "react-router-dom"

import {Auth} from 'components/auth'

import style from './styles/Authorization.module.scss'

const Authorization = () => (
  <div className={style.normal}>
    <div className={style.left}></div>
    <div className={style.right}>
      <Auth />
      {/* <div className={style.authFooter}>
        <ul className={style.links}>
          <li className={style.linksItem}>
            <Link className={style.authFooterLink} to="/help">Help</Link>
          </li>
          <li className={style.linksItem}>
            <Link className={style.authFooterLink} to="/contacts">Contacts</Link>
          </li>
          <li className={style.linksItem}>
            <Link className={style.authFooterLink} to="/confidentiality">Privacy Policy</Link>
          </li>
        </ul>
        <small className={style.copyright}>Copyright © 2019</small>
      </div> */}
    </div>
  </div>
)

export default Authorization

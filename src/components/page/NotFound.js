import React from 'react'
import {Link} from "react-router-dom"

import style from './styles/NotFound.module.scss'

const NotFound = () => (
  <div className={style.normal}>
    <img className={style.image} src="/assets/img/error.png" alt=""/>
    <h2 className={style.title}>Error 404</h2>
    <h3 className={style.subtitle}>Oops! Something is broken.</h3>
    <p className={style.text}>Sorry, we can’t find the page you were looking for.</p>
    <Link className={style.link} to="/">Return to homepage</Link>
  </div>
)

export default NotFound

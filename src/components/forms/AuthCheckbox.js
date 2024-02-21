import React from 'react'

import {Icon} from 'components/utility'

import style from './styles/AuthCheckbox.module.scss'

const AuthCheckbox = ({isActive, name, onChange, children}) => (
  <label className={style.normal}>
    <input className={style.checkbox} name={name} type="checkbox" onChange={onChange}/>
    <span className={isActive ? style.active : style.check}>
      <span className={style.iconWrap}>
        <Icon icon="check" className={style.icon} />
      </span>
    </span>
    {children}
  </label>
)

export default AuthCheckbox

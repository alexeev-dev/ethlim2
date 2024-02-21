import React from 'react'

import {Icon} from 'components/utility'

import style from './styles/Checkbox.module.scss'

const Checkbox = ({className: mixin, isActive, type = '', name, onChange, children}) => (
  <label className={`${style.normal} ${mixin ? mixin : ''}`}>
    <input className={style.checkbox} name={name} type="checkbox" onChange={onChange}/>
    <span className={isActive ? style.active : style.check}>
      <span className={style.iconWrap}>
        <Icon icon={type ? `check-${type}` : 'check'} className={style.icon} />
      </span>
    </span>
    {children}
  </label>
)

export default Checkbox

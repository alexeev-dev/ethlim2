import React from 'react'

import style from './styles/Icon.module.scss'

const Icon = ({icon, className: mixin}) => <i className={`${style.if} ${style[icon]} ${mixin ? mixin : ''}`}></i>

export default Icon

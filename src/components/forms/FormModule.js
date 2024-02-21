import React from 'react'

import style from './styles/FormModule.module.scss'

const FormModule = ({children}) => (
  <div className={style.normal}>
    {children}
  </div>
)

export default FormModule

import React from 'react'

import style from './styles/Form.module.scss'

const Form = ({title, subtitle, buttonText, disableButton = false, children, onSubmit}) => (
  <div className={style.normal}>
    <div className={style.header}>
      <h2 className={style.title}>{title}</h2>
      <h3 className={style.subtitle}>{subtitle}</h3>
    </div>
    <form className={style.form} action="#" onSubmit={onSubmit}>
      {children}
      <button className={disableButton ? style.disabled : style.button}>{buttonText}</button>
    </form>
  </div>
)

export default Form

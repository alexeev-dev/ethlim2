import React from 'react'

import style from './styles/FunnelStat.module.scss'

const FunnelStat = ({title = false, selected, label, value, strong = false, children, color = ''}) => (
  <div className={style.stat}>
    {title && <p className={style.title}>{title}</p>}
    {children}
    {strong
      ? <div className={selected > 0 ? style.counter : style.labelWrap}>
          {selected > 0 && <span className={style.selectedStrong}>{selected}</span>}
          <span className={style.strong}>{label}:</span>
          <strong className={`${style.strong} ${style[color]}`}>{value}</strong>
        </div>
      : <div className={selected > 0 ? style.counter : style.labelWrap}>
          {selected > 0 && <span className={style.selected}>{selected}</span>}
          <span className={style.label}>{label}:</span>
          <strong className={style.strong}>{value}</strong>
        </div>
    }
  </div>
)

export default FunnelStat

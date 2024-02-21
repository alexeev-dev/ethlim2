import React from 'react'

import style from './styles/Switcher.module.scss'

import {SwitcherRowContainer, LoadingStatus} from 'components/analytics'

const Switcher = ({popup, onAction}) => (
  <div className={style.switcher}>
    {popup.sources.status !== 'done' ? <LoadingStatus />
    : <table className={style.table}>
      <tbody className={style.tableBody}>
        {popup.sources.items.map((item) => (
          <SwitcherRowContainer
            key={item}
            id={item}
            total={popup.sources.items.length}
            onToggle={onAction}
          />
        ))}
      </tbody>
    </table>}
  </div>
)

export default Switcher

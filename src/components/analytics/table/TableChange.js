import React, {Component} from 'react'

import {Icon} from 'components/utility'

import style from './styles/TableChange.module.scss'

class TableChange extends Component {
  handleClick = (event) => {
    event.preventDefault()
    const {onAction} = this.props
    const tab = event.target.getAttribute('data-tab')

    if (typeof onAction === 'function') {
      onAction(tab)
    }
  }

  render() {
    const {tabs} = this.props
    const tabsF = tabs.slice(0, tabs.length - 2)
    const tabsS = tabs.slice(tabs.length - 2)
    return (
      <div className={style.normal}>
        <ul className={style.tab}>
          {tabsF.map(({name, count, title, status, isDisabled, isSelected}) => (
            <li className={`${isDisabled && style.disabled} ${style.tabItem}`} key={name}>
              {(status.name !== 'DONE' && status.name !== 'OUTDATED') && <span className={style.status}><img className={style.statusImage} src={`/assets/img/${status.target}-loading.svg`} alt=""/></span>}
              <button
                data-tab={name}
                className={isSelected ? style.active : style.tabButton}
                onClick={this.handleClick}
                disabled={isDisabled}
              >{title}</button>
              {count > 0 && <span className={style.count}>{count}</span>}
            </li>
          ))}
        </ul>
        <ul className={style.tabSecond}>
          {tabsS.map(({name, count, title, status, isDisabled, isSelected}) => (
            <li className={`${isDisabled && style.disabled} ${style.tabSecondItem}`} key={name}>
              {(status.name !== 'DONE' && status.name !== 'OUTDATED') && <span className={style.status}><img className={style.statusImage} src={`/assets/img/${status.target}-loading.svg`} alt=""/></span>}
              <button
                data-tab={name}
                className={isSelected ? style.activeSecond : style.tabSecondButton}
                onClick={this.handleClick}
                disabled={isDisabled}
              ><Icon className={style.icon} icon={name} /></button>
              {count > 0 && <span className={style.count}>{count}</span>}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default TableChange

import React, {Component} from 'react'

import {
  AnalyticsActiveFiltersContainer,
  SearchContainer
} from 'containers'
import {Icon} from 'components/utility'

import style from './styles/Header.module.scss'

class Header extends Component {
  handleClick = event => {
    event.preventDefault()
    const {onToggle} = this.props
    const name = event.target.getAttribute('data-name')

    if (typeof onToggle === 'function') {
      onToggle(name)
    }
  }
  render() {
    const {right} = this.props
    return (
      <div className={style.normal}>
        <div className={style.left}>
          <SearchContainer />
        </div>
        <div className={style.right}>
          <AnalyticsActiveFiltersContainer />
          <button className={style.button} data-name="right" onClick={this.handleClick}>
            <Icon className={right ? style.openRight : style.icon} icon="chevron-left" />
          </button>
        </div>
      </div>
    )
  }
}

export default Header

import React, {Component} from 'react'

import {Filter} from '../'
import {Icon} from 'components/utility'

import style from './styles/FiltersGroup.module.scss'

class FiltersGroup extends Component {
  handleOpen = event => {
    event.preventDefault()
    const {onOpen} = this.props
    if (typeof onOpen === 'function') {
      onOpen()
    }
  }

  render() {
    const {filter, onSearch, onChange} = this.props
    const {values, title, icon, isOpen, ...other} = filter
    return (
      <div className={isOpen ? style.opened : style.normal}>
        <button className={style.button} onClick={this.handleOpen}>
          <Icon className={style.buttonIcon} icon={icon} />{title}
          <Icon className={style.buttonChevron} icon={isOpen ? 'chevron-up' : 'chevron-down'} />
        </button>
        <Filter
          isOpen={isOpen}
          values={values}
          onSearch={onSearch}
          onChange={onChange}
          {...other}
        />
      </div>
    )
  }
}

export default FiltersGroup

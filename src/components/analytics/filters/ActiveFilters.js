import React, {Component} from 'react'

import {Icon} from 'components/utility'

import style from './styles/ActiveFilters.module.scss'

class ActiveFilters extends Component {
  handleDisable = event => {
    event.preventDefault()
    const {onRemove} = this.props
    const name = event.target.getAttribute('data-name')
    const value = event.target.getAttribute('data-value')

    if (typeof onRemove === 'function') {
      onRemove(name, value)
    }
  }

  render() {
    const {filters} = this.props
    return (
      <div className={style.normal}>
        {filters.map(({filter, value}) => (
          <button
            className={style.filter}
            data-name={filter.name}
            data-value={value.id}
            onClick={this.handleDisable}
            key={filter.name + value.id}
            >
              <span className={style.filterTitle}>{filter.title}: {value.title}</span>
              <Icon className={style.filterIcon} icon="close-big" />
          </button>
        ))}
      </div>
    )
  }
}

export default ActiveFilters

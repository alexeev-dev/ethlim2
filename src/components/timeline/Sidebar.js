import React, {Component} from 'react'

import {Checkbox} from 'components/forms'
import {typeFilterValues, typeFilterData} from 'services/timeline/data'

import style from './styles/Sidebar.module.scss'

class Sidebar extends Component {
  handleChange = (event) => {
    const {onChange} = this.props
    if (typeof onChange === 'function') {
      onChange(event.target.name)
    }
  }

  render() {
    const {currentType} = this.props
    return (
      <div className={style.normal}>
        <h2 className={style.sidebarTitle}>Show activity</h2>
        <ul className={style.filters}>
          {typeFilterValues.map(value => (
            <li key={value} className={style.filtersItem}>
              <Checkbox
                isActive={value === currentType}
                name={value}
                type="thin"
                onChange={this.handleChange}
              >
                {typeFilterData[value].title}
              </Checkbox>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Sidebar

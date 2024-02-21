import React, {Component} from 'react'

import {FETCHING} from 'services/analytics/reducers/table'

import style from './styles/Filter.module.scss'

class Filter extends Component {
  handleChange = event => {
    const {id, onSearch} = this.props
    const {value} = event.target

    if (typeof onSearch === 'function') {
      onSearch(id, value)
    }
  }

  handleClick = event => {
    event.preventDefault()
    const value = event.target.getAttribute('data-value')
    const {id, onChange} = this.props

    if (typeof onChange === 'function') {
      onChange(id, value)
    }
  }

  render() {
    const {status, search, values, isOpen} = this.props

    if (!isOpen) {return null}

    return (
      <div className={style.normal}>
        <input
          className={style.input}
          type="text"
          placeholder="Search"
          value={search}
          onChange={this.handleChange}
          autoComplete="off"
        />
        <ul className={style.values}>
          {
            status !== FETCHING ? values.map(v => (
              <li
                key={v.id}
                data-value={v.id}
                className={style.valuesItem}
                onClick={this.handleClick}
                >{v.title}</li>
              )) : <li className={style.valuesFetching} key="fetching">
                Loading...
              </li>
          }
        </ul>
      </div>
    )
  }
}

export default Filter

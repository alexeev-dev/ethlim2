import React, {Component} from 'react'

import {Icon} from 'components/utility'

import style from './styles/TableSearch.module.scss'

class TableSearch extends Component {
  handleCheck = (event) => {
    const {onToggle} = this.props
    if (typeof onToggle === 'function') {
      onToggle()
    }
  }

  handleChange = (event) => {
    const {onChange} = this.props
    const {value} = event.target
    if (typeof onChange === 'function') {
      onChange(value)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {onSubmit} = this.props
    if (typeof onSubmit === 'function') {
      onSubmit()
    }
  }

  render() {
    const {type, phrase} = this.props
    const isActive = type === 'byId'
    return (
      <div className={style.normal}>
        <button className={isActive ? style.idActive : style.id} onClick={this.handleCheck}>ID</button>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <input
            className={isActive ? style.formInputId : style.formInput}
            type="text"
            value={phrase}
            placeholder="Search any data here"
            onChange={this.handleChange}
          />
          <button className={style.formButton}><Icon icon="search" /></button>
        </form>
      </div>
    )
  }
}

export default TableSearch

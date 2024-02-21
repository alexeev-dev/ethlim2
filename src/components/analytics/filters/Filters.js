import React, {Component} from 'react'

import {FiltersGroupContainer} from '../'
import {Icon} from 'components/utility'

import style from './styles/Filters.module.scss'

class Filters extends Component {
  handleLoad = event => {
    event.preventDefault()
    const {onLoad} = this.props

    if (typeof onLoad === 'function') {
      onLoad()
    }
  }

  handleSave = event => {
    event.preventDefault()
    const {onSave} = this.props

    if (typeof onSave === 'function') {
      onSave()
    }
  }

  handleReset = event => {
    event.preventDefault()
    const {onReset} = this.props

    if (typeof onReset === 'function') {
      onReset()
    }
  }

  handleClose = event => {
    event.preventDefault()
    const {name, onClose} = this.props

    if (typeof onClose === 'function') {
      onClose(name)
    }
  }

  render() {
    const {filters} = this.props
    return (
      <div className={style.normal}>
        {/* <ul className={style.header}>
          <li className={style.headerItem}>
            <button className={style.headerButton} onClick={this.handleLoad}>
              <Icon className={style.headerIcon} icon="upload-cloud" />
              <span className={style.headerText}>Upload</span>
            </button>
          </li>
          <li className={style.headerItem}>
            <button className={style.headerButton} onClick={this.handleSave}>
              <Icon className={style.headerIcon} icon="download-cloud" />
              <span className={style.headerText}>Save</span>
            </button>
          </li>
        </ul> */}
        <button className={style.reset} onClick={this.handleReset}>
          <Icon className={style.resetIcon} icon="close-big" />clear all
        </button>
        <ul className={style.filters}>
          {filters.map(filter => (
            <li className={style.filtersItem} key={filter.id}>
              <FiltersGroupContainer filter={filter} />
            </li>
          ))}
        </ul>
        {/* <button className={style.close} onClick={this.handleClose}>
          Close
          <Icon className={style.closeIcon} icon="close-big" />
        </button> */}
      </div>
    )
  }
}

export default Filters

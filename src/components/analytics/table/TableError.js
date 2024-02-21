import React, {Component} from 'react'

import {Icon} from 'components/utility'

import style from './styles/TableError.module.scss'

class TableError extends Component {
  handleClick = (event) => {
    event.preventDefault()
    const {error, onReload} = this.props

    if (typeof onReload === 'function') {
      onReload(error.reload)
    }
  }
  render() {
    const {error} = this.props
    return (
      <div className={style.normal}>
        <div className={style.error}>
          <Icon icon="warning-3" className={style.errorIcon} />
          <p className={style.text}>
            <strong className={style.strong}>
              Error!
            </strong> When trying to get data from the server: <strong className={style.strong}>
              {error.message}
            </strong>
          </p>
        </div>
        <button className={style.button} onClick={this.handleClick}><Icon icon="refresh" className={style.buttonIcon} /></button>
      </div>
    )
  }
}

export default TableError

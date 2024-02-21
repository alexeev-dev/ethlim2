import React, {Component} from 'react'

import {Icon} from 'components/utility'

import style from './styles/Checkbox.module.scss'

class Checkbox extends Component {
  handleToggle = (event) => {
    event.preventDefault()

    const {id, isActive, onToggle} = this.props

    if (typeof onToggle === 'function') {
      onToggle(id, !isActive)
    }
  }

  getClass() {
    const {isActive, type, opStatus, className: mixin} = this.props
    return `${mixin ? mixin : ''} ${type ? style[type] : ''} ${isActive ? style.active : ''} ${opStatus ? style.status : style.normal}`
  }

  render() {
    const {opStatus} = this.props
    return (
      <button className={this.getClass()} onClick={this.handleToggle}>
        <span className={style.circle}>
          {opStatus && (opStatus === 'updating'
            ? <img className={style.updating} src="/assets/img/updating.svg" alt=""/>
            : opStatus === 'none'
              ? ''
              : <Icon
                  className={`${opStatus === 'done' ? style.statusIconDone : style.statusIconError}`}
                  icon={opStatus}
                />
          )}
        </span>
      </button>
    )
  }
}

export default Checkbox

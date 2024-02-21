import React, {Component} from 'react'
import {AlgorithmButtons} from 'components/analytics'
import {Checkbox} from 'components/utility'

import style from './styles/CellName.module.scss'

class CellName extends Component {
  handleClick = event => {
    event.preventDefault()
    const {row, onAction} = this.props
    const {shiftKey} = event
    if (typeof onAction === 'function') {
      onAction(shiftKey ? 'shift' : 'toggle', row.id)
    }
  }

  handleToggle = () => {
    const {row, onVisible} = this.props
    const {opStatus} = row.meta

    if (opStatus !== 'updating' && typeof onVisible === 'function') {
      onVisible(row.id)
    }
  }

  getStatusClass() {
    const {isFetching, isOpen} = this.props.row.meta
    return isFetching
      ? style.loading
      : isOpen
        ? style.active
        : style.toggle
  }

  render() {
    const {row, onAction} = this.props
    const {id, title} = row.attributes.entity
    const {isActive, opStatus} = row.meta

    return (
      <td className={style.normal}>
        {isActive !== null && <Checkbox type="small" isActive={isActive} opStatus={opStatus} onToggle={this.handleToggle} />}
        <button className={style.select} onClick={this.handleClick}>[{id}] {title}</button>
        <AlgorithmButtons row={row} onAction={onAction} />
      </td>
    )
  }
}

export default CellName

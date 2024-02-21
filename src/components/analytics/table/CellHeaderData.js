import React, {Component} from 'react'
import {Icon, toIcon} from 'components/utility'

import style from './styles/CellHeaderData.module.scss'

class CellHeaderData extends Component {
  handleClick = event => {
    event.preventDefault()
    const {column, onSort} = this.props
    if (typeof onSort === 'function') {
      onSort(column.id)
    }
  }

  render() {
    const {column, sorting} = this.props
    const {target, isAscending} = sorting
    const isSorted = column.id === target
    return (
      <td className={style.normal}>
        <button className={style.button} onClick={this.handleClick}>
          {toIcon(column.attributes.title, style.titleIcon)}
          <span className={isSorted ? style.currentSorted : style.sorted}>
            <Icon className={isAscending && isSorted ? style.highlight : style.sortedIcon} icon="arrow-drop-up" />
            <Icon className={!isAscending && isSorted ? style.highlight : style.sortedIcon} icon="arrow-drop-down" />
          </span>
          <div className={style.tooltip}><strong className={style.tooltipStrong}>({column.id}):</strong> {column.attributes.tooltip}</div>
        </button>
      </td>
    )
  }
}

export default CellHeaderData

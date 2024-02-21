import React, {Component} from 'react'
import {needClicks, needLeads} from 'services/columns/columns'

import style from './styles/CellData.module.scss'

class CellData extends Component {
  isIrrelevant() {
    const {row, column} = this.props
    const {metrics} = row.attributes
    const noClicks = metrics.clicks[0] === 0
    const noLeads = metrics.leads[0] === 0
    return noLeads
      ? noClicks
        ? !!needClicks[column.id]
        : !!needLeads[column.id]
      : false
  }

  render() {
    const {column, row} = this.props
    const fullData = row.attributes.metrics[column.id]
    const current = fullData[0]
    const prev = fullData[1]
    const hasValue = typeof current !== 'string'
    const direction = current - prev === 0
      ? 'delta'
      : current - prev > 0
        ? 'up'
        : 'down'
    return (
      <td className={style.normal}>
        {current} {hasValue && <span className={style.dimension}>{column.attributes.dimension}</span>}
        <span className={style[direction]}>
          {prepareValue(current, prev, column.attributes.dimension)}
        </span>
      </td>
    )
  }
}

function prepareValue(current, prev, dimension) {
  if (typeof prev !== 'undefined') {
    const delta = current - prev
    if (prev === 0) {
      return delta !== 0
        ? withSign(delta, ' ' + dimension)
        : '—'
    }
    const newValue = Math.round((100 * (delta) / Math.abs(prev)))
    return withSign(newValue, '%')
  }
  return ''
}

function withSign(value, postfix = '') {
  const sign = value > 0 ? '+' : ''
  return sign + value + postfix
}

export default CellData

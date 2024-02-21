import React, {Component} from 'react'

import {Icon} from 'components/utility'

import style from './styles/CellAdj.module.scss'
import {calcRoiAdjustment, calcLeadAdjustment} from 'services/analytics/adjustments'

class CellAdj extends Component {
  prepareAdjusmentParams() {
    const {row, params} = this.props
    return {
      roi: row.attributes.metrics.ROI[0],
      cost: row.attributes.metrics.leads_cost[0],
      troi: params.troi,
      tcost: params.tcost,
      cpc: row.attributes.metrics.CPC[0],
      minCPC: params.rate.min,
      maxCPC: params.rate.max,
      maxAdjustment: params.adjustmentMax
        ? params.adjustmentMax / 100
        : 0
    }
  }

  getAdjustments() {
    const {column} = this.props
    const params = this.prepareAdjusmentParams()

    if (column.id === 'adjustmentA') {
      return calcRoiAdjustment(params)
    }

    return calcLeadAdjustment(params)
  }

  genericAdjustment() {
    const {row, params} = this.props
    const {id} = this.props.column
    const clicks = row.attributes.metrics.clicks[0]
    const clicksLimit = params.clicks
    const adjustment = this.getAdjustments()
    const isActive = clicks >= clicksLimit
    const value = !isActive
      ? '—'
      : adjustment === 0 || (id === 'adjustmentA' && adjustment < 0) || (id === 'adjustmentB' && adjustment > 0)
        ? '—'
        : adjustment > 0
          ? `+${adjustment}`
          : adjustment
    return value
  }

  getIcon = () => {
    const {id} = this.props.column
    return id === 'adjustmentA'
      ? <Icon className={style.green} icon='arrow-up' />
      : <Icon className={style.red} icon='arrow-down' />
  }

  render() {
    const value = this.genericAdjustment()
    return (
      <td className={style.normal}>
        {value !== '—' && this.getIcon()}
        {value}
        {value !== '—' && <span className={style.dimension}>rub</span>}
      </td>
    )
  }
}

export default CellAdj

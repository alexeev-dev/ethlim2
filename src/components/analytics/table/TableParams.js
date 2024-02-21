import React, {Component} from 'react'

import {
  AnalyticsFiltersContainer
} from 'containers'
import {TableParam} from '../'

import style from './styles/TableParams.module.scss'

import {tableParams} from 'data/analytics'

class TableParams extends Component {
  render() {
    const {params, onChange} = this.props

    return (
      <div className={style.normal}>
        <AnalyticsFiltersContainer name="left" onClose={this.handleToggle} />
        <div className={style.params}>
          {tableParams.map(p => <TableParam
            key={p.name}
            name={p.name}
            title={p.title}
            values={params[p.name]}
            dimension={p.dimension}
            color={p.color}
            onChange={onChange}
          />)}
        </div>
      </div>
    )
  }
}

export default TableParams

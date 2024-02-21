import React, {Component} from 'react'

import {Icon} from 'components/utility'

import style from './styles/CellHeaderAdj.module.scss'

class CellHeaderAdj extends Component {
  render() {
    const {column} = this.props
    const {id} = column
    return (
      <td className={style[column.attributes.style]}>
        {id === 'adjustmentA' && <Icon className={style.icon} icon="arrow-up" />}
        {id === 'adjustmentB' && <Icon className={style.icon} icon="arrow-down" /> }
        {column.attributes.title}
      </td>
    )
  }
}

export default CellHeaderAdj

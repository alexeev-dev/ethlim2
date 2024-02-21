import React, {Component} from 'react'

import {Cell} from '../'

import style from './styles/THead.module.scss'

class THead extends Component {
  render() {
    const {columns, ...other} = this.props
    return (
      <thead>
        <tr className={style.normal}>
          {columns.map(column => <Cell
            key={column.id}
            type={column.attributes.cell[0]}
            column={column}
            {...other}
          />)}
        </tr>
      </thead>
    )
  }
}

export default THead

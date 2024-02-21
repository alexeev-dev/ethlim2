import React, {Component} from 'react'

import {Cell} from '../'

import style from './styles/TRow.module.scss'

class TRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isHidden: false
    }
  }

  handleToggle = () => {
    this.setState(prev => ({isHidden: !prev.isHidden}))
  }

  render() {
    const {columns, isHiddenVisible, ...other} = this.props
    const {isSelected} = this.props.row.meta
    const {isHidden} = this.state

    if (isHidden && !isHiddenVisible) {
      return null
    }

    const ROI = this.props.row.attributes.metrics.ROI[0] || 0
    const direction = ROI < 0
      ? 'down'
      : ROI >= 100
        ? 'up'
        : 'normal'

    return (
      <tr className={isSelected ? style.selected : style[direction]}>
        {columns.map(column => <Cell
          type={column.attributes.cell[1]}
          key={column.id}
          column={column}
          isHidden={isHidden}
          isHiddenVisible={isHiddenVisible}
          {...other}
        />)}
      </tr>
    )
  }
}

export default TRow

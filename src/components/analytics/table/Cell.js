import React, {Component} from 'react'

import {
  CellName, CellData, CellAdj,
  CellHeaderName, CellHeaderData, CellHeaderAdj
} from '../'

class Cell extends Component {
  render() {
    const {type, ...other} = this.props
    switch(type) {
      case 'headerName':
        return <CellHeaderName {...other} />
      case 'headerData':
        return <CellHeaderData {...other} />
      case 'headerAdj':
        return <CellHeaderAdj {...other} />
      case 'name':
        return <CellName {...other} />
      case 'data':
        return <CellData {...other} />
      case 'adj':
        return <CellAdj {...other} />
      default:
        return <td>Undefined cell type: {type}</td>
    }
  }
}

export default Cell

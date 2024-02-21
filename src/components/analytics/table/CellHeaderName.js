import React, {Component} from 'react'

import style from './styles/CellHeaderName.module.scss'

class CellHeaderName extends Component {
  render() {
    return (
      <td className={style.normal}>
        <div className={style.cell}>

        </div>
      </td>
    )
  }
}

export default CellHeaderName

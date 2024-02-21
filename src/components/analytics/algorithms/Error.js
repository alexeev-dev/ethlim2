import React, {Component} from 'react'

import style from './styles/Error.module.scss'

class Error extends Component {
  getErrorText() {
    const {id} = this.props
    switch(id) {
      case 'empty-response':
        return <p className={style.text}>No data.</p>
      case 'bad-response':
        return <p className={style.text}>Server error.</p>
      default:
        return <p className={style.text}>Undefined error.</p>
    }
  }

  render() {
    return (
      <div className={style.normal}>{this.getErrorText()}</div>
    )
  }
}

export default Error

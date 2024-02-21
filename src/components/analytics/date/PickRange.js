import React, {Component} from 'react'

import style from './styles/PickRange.module.scss'

function compare(dateOne, dateTwo) {
  const day = dateOne.getDate()
  const month = dateOne.getMonth()
  const year = dateOne.getFullYear()

  return day === dateTwo.getDate()
  && month === dateTwo.getMonth()
  && year === dateTwo.getFullYear()
}

class PickRange extends Component {
  handleClick = () => {
    const {value, onClick} = this.props
    const calcValue = value()

    if (typeof onClick === 'function') {
      onClick(calcValue)
    }
  }

  isActive() {
    const {value, currentRange = ''} = this.props
    const calcValue = value()

    return compare(calcValue.from, currentRange.from)
      && compare(calcValue.to, currentRange.to)
  }

  render() {
    const {title} = this.props
    return (
      <button className={this.isActive() ? style.active : style.normal} onClick={this.handleClick}>
        <span className={style.title}>{title}</span>
      </button>
    )
  }
}

export default PickRange

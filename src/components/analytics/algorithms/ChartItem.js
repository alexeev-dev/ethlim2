import React, {Component} from 'react'

import style from './styles/ChartItem.module.scss'

class ChartItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      position: {
        left: 0,
        top: 0
      }
    }
  }

  getPosition = (event) => {
    const {offsetTop, offsetLeft, parentNode, offsetParent} = event.target
    const top = offsetTop + offsetParent.offsetTop - 9
    const left = offsetLeft + offsetParent.offsetLeft - parentNode.scrollLeft + 14
    this.setState({position: {left, top}})
  }

  getDate(date) {
    const newDate = new Date(date)
    const day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()
    const month = newDate.getMonth() < 9 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1
    const year = newDate.getFullYear()
    return day + '.' + month + '.' + year
  }

  render() {
    const {column, height, index} = this.props
    const {position} = this.state
    const {value, diff, date} = column
    const transfDate = this.getDate(date)
    const shortDate = transfDate.slice(0, 5)
    return (
      <div
        className={style.column}
        style={{height}}
        onMouseEnter={this.getPosition}
      >
        <ul
          className={style.columnStats}
          style={position}
        >
          <li className={style.columnStatsItem}>{value}</li>
          <li className={style.columnStatsItem}>{diff}</li>
        </ul>
        <p className={style.columnTime}>{transfDate}</p>
        {index % 5 === 0 && <span className={style.columnDate}>{shortDate}</span>}
      </div>
    )
  }
}

export default ChartItem

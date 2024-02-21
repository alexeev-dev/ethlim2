import React, {Component} from 'react'

import {Icon} from 'components/utility'

import style from './styles/DateRange.module.scss'

import {monthTitles} from 'data/date'

const toText = date => {
  const day = date.getDate()
  const month = monthTitles[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

class DateRange extends Component {
  handleOpen = event => {
    event.preventDefault()
    const {isOpen, onToggle} = this.props
    if (typeof onToggle === 'function') {
      onToggle(!isOpen)
    }
  }

  dateTransform = () => {
    const {from, to} = this.props.date
    const textFrom = toText(from)
    const textTo = toText(to)
    const text = textFrom === textTo ? textFrom : `${textFrom} - ${textTo}`
    return text
  }

  render() {
    return (
      <div className={style.normal}>
        <div className={style.current}>
          <button data-button="dateButton" className={style.currentButton} onClick={this.handleOpen}>
            <Icon className={style.currentIcon} icon="calendars" />
            <span className={style.currentDate}>{this.dateTransform()}</span>
          </button>
        </div>
      </div>
    )
  }
}

export default DateRange

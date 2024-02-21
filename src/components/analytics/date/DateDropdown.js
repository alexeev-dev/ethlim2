import React, {Component} from 'react'
import moment from 'moment'
import { extendMoment } from 'moment-range'
import DateRangePicker from 'react-daterange-picker'
import 'moment/locale/ru'

import {PickRange} from 'components/analytics'
import {dateRangeValues} from 'data/date'

import style from './styles/DateDropdown.module.scss'

const momentRange = extendMoment(moment);

const encode = date => momentRange.range(date.from, date.to)

class DateDropdown extends Component {
  saveDropdown = ref => this.dropdown = ref

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = event => {
    const source = event.target.getAttribute('data-button')
    if (this.dropdown && !this.dropdown.contains(event.target) && source !== 'dateButton') {
      const {onToggle} = this.props
      if (typeof onToggle === 'function') {
        onToggle(false)
      }
    }
  }

  handleSelect = (date) => {
    const {onRange} = this.props
    const newDate = date.toDate()
    const value = {from: newDate[0], to: newDate[1]}
    if (typeof onRange === 'function') {
      onRange(value)
    }
  }

  handleRange = value => {
    const {onRange} = this.props

    if (typeof onRange === 'function') {
      onRange(value)
    }
  }

  render() {
    const {date, isOpen} = this.props
    const secureDate = date === null ? {from: new Date(), to: new Date()} : date

    return (
      <div ref={this.saveDropdown} className={isOpen ? style.active : style.dropdown}>
        <DateRangePicker
          locale="en"
          singleDateRange={true}
          numberOfCalendars={2}
          selectionType='range'
          firstOfWeek={1}
          onSelect={this.handleSelect}
          value={encode(secureDate)}
        />

        <ul className={style.list}>
          {dateRangeValues.map(r => (
            <li key={r.value} className={style.item}>
              <PickRange
                currentRange={secureDate}
                value={r.value}
                title={r.title}
                onClick={this.handleRange}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default DateDropdown

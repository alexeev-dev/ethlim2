import React, {Component} from 'react'

import {DateRangeContainer,
DateDropdownContainer} from 'containers'

import style from './styles/DatePicker.module.scss'

class DatePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  handleDateOpen = (isOpen) => {
    this.setState({isOpen})
  }

  render() {
    const {isOpen} = this.state
    return (
      <div className={style.normal}>
        <DateRangeContainer isOpen={isOpen} onToggle={this.handleDateOpen} />
        <DateDropdownContainer isOpen={isOpen} onToggle={this.handleDateOpen} />
      </div>
    )
  }
}

export default DatePicker

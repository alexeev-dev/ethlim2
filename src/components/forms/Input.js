import React, {Component} from 'react'

import style from './styles/Input.module.scss'

class Input extends Component {
  handleChange = event => {
    const {name, onChange} = this.props
    const {value} = event.target

    if (typeof onChange === 'function') {
      onChange(name, value)
    }
  }

  render() {
    const {type, value, placeholder = ""} = this.props
    return (
      <div className={style.normal}>
        <input
          className={style.input}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Input

import React, {Component, Fragment} from 'react'

import style from './styles/TableParam.module.scss'

class TableParam extends Component {
  handleFocus = event =>  event.target.select()

  handleChange = event => {
    const {name, values, onChange} = this.props
    const {name: input, value} = event.target

    const newValue = name === 'rate'
      ? {...values, [input]: value}
      : value

    if (typeof onChange === 'function' && /^-?\d*\.?\d*$/.test(value)) {
      onChange(name, newValue)
    }
  }

  render() {
    const {name, title, values, dimension, color} = this.props

    return (
      <div className={style[color]}>
        <div className={style.inputs}>
          {name === 'rate'
            ? <Fragment>
              <input
                className={style.input}
                name="min"
                type="text"
                value={values.min}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
              />
              <span className={style.separator}>&mdash;</span>
              <input
                className={style.input}
                name="max"
                type="text"
                value={values.max}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
              />
            </Fragment>
            : <input
              className={style.input}
              name={name}
              type="text"
              value={values}
              onFocus={this.handleFocus}
              onChange={this.handleChange}
            />
          }
          <p className={style.dimension}>{dimension}</p>
        </div>
        <p className={style.title}>{title}</p>
      </div>
    )
  }
}

export default TableParam

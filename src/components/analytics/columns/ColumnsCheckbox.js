import React, {Component} from 'react'

import {Icon, toIcon} from 'components/utility'

import style from './styles/ColumnsCheckbox.module.scss'

class ColumnsCheckbox extends Component {
  handleChange = event => {
    const {name, isActive, onChange} = this.props

    if (typeof onChange === 'function') {
      onChange(name, !isActive)
    }
  }

  render() {
    const {name, label, tooltip, groupNumber, isActive} = this.props
    return (
      <label className={isActive ? style.active : style.normal}>
        <input
          className={style.input}
          name={name}
          type="checkbox"
          onChange={this.handleChange}
          checked={isActive}
        />
        <Icon className={`${name === 'adjustmentA' && style.green} ${name === 'adjustmentB' && style.red} ${style.icon}`} icon={isActive ? 'checkbox' : 'checkbox-blank'} />
        <span className={`${name === 'adjustmentA' && style.green} ${name === 'adjustmentB' && style.red} ${style.label}`}>
          {name === 'adjustmentA' && <Icon className={style.labelIcon} icon="arrow-up" />}
          {name === 'adjustmentB' && <Icon className={style.labelIcon} icon="arrow-down" /> }
          {toIcon(label, style.textIcon)}
        </span>
        <div className={groupNumber < 3 ? style.bottom : style.tooltip}><strong className={style.tooltipStrong}>({name}):</strong> {tooltip}</div>
      </label>
    )
  }
}

export default ColumnsCheckbox

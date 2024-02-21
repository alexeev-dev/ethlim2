import React, {Component} from 'react'

import {Icon} from 'components/utility'

import style from './styles/SwitcherRow.module.scss'

class SwitcherRow extends Component {
  handleChange = event => {
    const {row, onToggle} = this.props
    const {id, opStatus} = row

    if (opStatus !== 'updating' && typeof onToggle === 'function') {
      onToggle(id)
    }
  }

  getLabelClass(isDisabled, isExcluded) {
    return !isDisabled
      ? isExcluded
        ? style.checkbox
        : style.active
      : style.disabled
  }

  render() {
    const {row, platform} = this.props
    const {name, opStatus, isExcluded} = row
    const isDisabled = platform !== '2'

    return (
      <tr className={style.row}>
        <td className={style.columnFirst}>
          <div className={style.cell}>
            <label className={this.getLabelClass(isDisabled, isExcluded)}>
              <span className={style.checkboxCircle}>
                {opStatus === 'updating'
                  ? <img src="/assets/img/updating.svg" alt=""/>
                  : opStatus === 'none'
                    ? ''
                    : <Icon
                        className={`${opStatus === 'done' ? style.statusIconDone : style.statusIconError}`}
                        icon={opStatus}
                      />
                }
              </span>
              <input
                className={style.input}
                type="checkbox"
                disabled={isDisabled}
                onChange={this.handleChange}
              />
            </label>
          </div>
        </td>
        <td className={style.column}>
          <div className={style.cell}>
            <p className={style.name}>{name}</p>
          </div>
        </td>
      </tr>
    )
  }
}

export default SwitcherRow

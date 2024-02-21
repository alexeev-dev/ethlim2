import React, {Component} from 'react'

import {ColumnsGroup} from '../'
import {Icon} from 'components/utility'

import {columnGroups, groups} from 'data/columns'

import style from './styles/Columns.module.scss'

class Columns extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  saveDropdown = ref => this.dropdown = ref
  saveButton = ref => this.button = ref

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = event => {
    if (this.dropdown && !this.dropdown.contains(event.target) && event.target !== this.button) {
      this.setState({isOpen: false})
    }
  }

  handleToggle = event => {
    event.preventDefault()

    this.setState(prev => ({isOpen: !prev.isOpen}))
  }

  handleChange = (name) => {
    const {onChange} = this.props

    if (typeof onChange === 'function') {
      onChange(name)
    }
  }

  render() {
    const {status} = this.props
    const {isOpen} = this.state
    return (
      <div className={isOpen ? style.opened : style.normal}>
        <button ref={this.saveButton} className={style.open} onClick={this.handleToggle}>
          <Icon className={style.openIcon} icon="cog" />
          <span className={style.openText}>add / remove columns</span>
        </button>
        <div ref={this.saveDropdown} className={style.columns}>
          <button className={style.close} onClick={this.handleToggle}>
            <Icon className={style.closeIcon} icon="close-big" />
          </button>
          <ul className={style.groupsList}>
            {columnGroups.map((g, i) => <ColumnsGroup
              key={g}
              status={status}
              group={groups[g]}
              groupNumber={i}
              onChange={this.handleChange}
            />)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Columns

import React, {Component} from 'react'
import {Icon} from 'components/utility'

import style from './styles/AlgorithmButtons.module.scss'

const buttons = {
  switcher: {
    type: 'switcher',
    icon: 'switcher',
    tooltip: 'Traffic source'
  },
  funnel: {
    type: 'funnel',
    icon: 'funnel',
    tooltip: 'Funnel'
  },
  bid: {
    type: 'bid',
    icon: 'bid',
    tooltip: 'Change Bid'
  },
  loupe: {
    type: 'sources',
    icon: 'loupe',
    tooltip: 'Traffic source'
  }
}

const levelsButtons = {
  campaigns: [buttons.funnel, buttons.loupe],
  groups: [buttons.funnel],
  phrases: [buttons.funnel, buttons.bid],
  ads: [buttons.funnel],
  sources: [buttons.funnel],
  regions: [buttons.funnel],
  offers: [buttons.funnel]
}

class AlgorithmButtons extends Component {
  handleClick = (event) => {
    event.preventDefault()
    const {row, onAction} = this.props
    const type = event.target.getAttribute('data-type')
    if (typeof onAction === 'function') {
      onAction('popup', {type, target: row.id})
    }
  }
  render() {
    const {type} = this.props.row.attributes.entity
    return (
      <div className={style.normal}>
        {levelsButtons[type].map(button => (
          <button
            key={button.icon}
            className={style.button}
            data-type={button.type}
            onClick={this.handleClick}
          >
            <Icon className={style.icon} icon={button.icon} />
            <div className={style.tooltip}>{button.tooltip}</div>
          </button>
        ))}
      </div>
    )
  }
}

export default AlgorithmButtons

import React, {Component} from 'react'

import {
  TableParamsContainer,
  TableWrapContainer
} from 'containers'
import {Header} from './'

import style from './styles/AnalyticsBody.module.scss'

class AnalyticsBody extends Component {
  constructor(props) {
    super(props)

    this.state = {
      left: false,
      right: false
    }
  }

  handleToggle = name => {
    this.setState(prev => ({[name]: !prev[name]}))
  }

  render() {
    const {left, right} = this.state

    return (
      <div className={style.normal}>
        <div className={style.center}>
          <Header left={left} right={right} onToggle={this.handleToggle} />
          <TableWrapContainer />
        </div>
        <div className={`${style.right} ${right ? style.open : ''}`}>
          <TableParamsContainer />
        </div>
      </div>
    )
  }
}

export default AnalyticsBody

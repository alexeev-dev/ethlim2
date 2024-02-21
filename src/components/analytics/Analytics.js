import React, {Component} from 'react'

import {AlgorithmsContainer} from 'containers'
import {AnalyticsBody} from './'

import style from './styles/Analytics.module.scss'

class Analytics extends Component {
  render() {
    return (
      <div className={style.normal}>
        <AnalyticsBody />
        <AlgorithmsContainer />
      </div>
    )
  }
}

export default Analytics

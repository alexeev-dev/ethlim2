import React, {Component} from 'react'

import {HistoryContainer, TimelineSidebarContainer} from 'containers'

import style from './styles/Timeline.module.scss'

class Timeline extends Component {
  render() {
    return (
      <div className={style.normal}>
        <TimelineSidebarContainer />
        <HistoryContainer />
      </div>
    )
  }
}

export default Timeline

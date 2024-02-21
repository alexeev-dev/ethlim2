import React, {Component} from 'react'
import {DateGroup} from './'

import style from './styles/History.module.scss'

class History extends Component {
  saveRef = ref => this.container = ref

  componentDidMount() {
    const {token, onEnter} = this.props
    if (token && typeof onEnter === 'function') {
      onEnter()
    }
  }

  componentDidUpdate() {
    const {page, hasMore, hasError, isPending, onNeedMore} = this.props
    const {clientHeight} = this.container
    if (page <= 10 && hasMore && !isPending && !hasError && clientHeight < 600) {
      if (typeof onNeedMore === 'function') {
        onNeedMore()
      }
    }
  }

  render() {
    const {nav, groups, isPending, hasError} = this.props
    if (nav.project === null) {
      return <div ref={this.saveRef} className={style.normal}></div>
    }
    return (
      <div ref={this.saveRef} className={style.normal}>
        {groups.map((group) => (
          <DateGroup key={group.id} group={group} />
        ))}
        {hasError && <div>
          No data! <br />
          Try to change time period or choose another project.
        </div>}
        {isPending && <div className={style.pending}></div>}
      </div>
    )
  }
}

export default History

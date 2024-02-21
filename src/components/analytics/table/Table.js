import React, {Component} from 'react'

import {THeadContainer, TBodyContainer} from 'containers'
// import {CLUSTER_SIZE} from 'services/metrics/selectors'

import style from './styles/Table.module.scss'

class Table extends Component {
  saveScrollable = ref => this.scrollable = ref

  componentDidMount() {
    const {onReady} = this.props
    if (typeof onReady === 'function') {
      onReady()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentTab !== prevProps.currentTab) {
      this.scrollable.scrollTo(0, 0)
    }
  }

  handleScroll = event => {
    // const {cluster, onClusterChange} = this.props
    // const scrolledRows = Math.floor(this.scrollable.scrollTop / 32) - 10
    // const targetCluster = Math.floor(Math.max(scrolledRows, 0) / CLUSTER_SIZE)
    // if (targetCluster !== cluster && typeof onClusterChange === 'function') {
    //   onClusterChange(targetCluster)
    // }
    const {loadStatus, onEnd} = this.props
    const {scrollHeight, clientHeight, scrollTop} = this.scrollable
    const toBottom = scrollHeight - clientHeight - scrollTop
    if (toBottom - 58 <= 0 && loadStatus) {
      if (typeof onEnd === 'function') {
        onEnd()
      }
    }
  }

  render() {
    const {status, isHiddenVisible, onShowHidden} = this.props
    return (
      <div className={status === 'FETCHING' ? style.fetching : style.normal}>
        <div ref={this.saveScrollable} className={style.scrollable} onScroll={this.handleScroll}>
          <table className={style.table}>
            <THeadContainer
              isHiddenVisible={isHiddenVisible}
              onShowHidden={onShowHidden}
            />
            <TBodyContainer
              isHiddenVisible={isHiddenVisible}
            />
          </table>
        </div>
      </div>
    )
  }
}

export default Table

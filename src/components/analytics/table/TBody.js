import React, {Component} from 'react'

import {TRowContainer} from '../'

class TBody extends Component {
  componentDidMount() {
    const {onReady} = this.props
    if (typeof onReady === 'function') {
      onReady()
    }
  }

  render() {
    const {rows, before, after, ...other} = this.props
    const offsetBefore = before * 32 + 'px'
    const offsetAfter = after * 32 + 'px'
    return (
      <tbody>
        <tr style={{height: offsetBefore}}></tr>
        {rows.map(r => <TRowContainer
          key={r}
          id={r}
          {...other}
        />)}
        <tr style={{height: offsetAfter}}></tr>
      </tbody>
    )
  }
}

export default TBody

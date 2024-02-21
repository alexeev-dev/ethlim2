import React, {Component} from 'react'
import {MultipopupContainer} from 'components/analytics'

import style from './styles/Wrap.module.scss'

class Wrap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zIndex: 1
    }
  }

  handleZIndex = zIndex => {
    this.setState({zIndex})
  }

  render() {
    const {popups} = this.props
    const {zIndex} = this.state
    return (
      <div className={style.wrap}>
        {popups.map(popup => <MultipopupContainer key={popup} popup={popup} zIndex={zIndex} onZIndex={this.handleZIndex} />)}
        <div className="popupWrap-overlay"></div>
      </div>
    )
  }
}

export default Wrap

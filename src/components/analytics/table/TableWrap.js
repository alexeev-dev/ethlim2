import React, {Component} from 'react'

import {ColumnsContainer,
  TableChangeContainer,
  // HierarchyContainer,
  TableContainer} from 'containers'
import {Footer} from '../'

import style from './styles/TableWrap.module.scss'

class TableWrap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isHiddenVisible: false,
      isFullscreen: false
    }
  }

  saveContainer = ref => this.container = ref

  handleToggle = () => {
    this.setState(prev => ({isHiddenVisible: !prev.isHiddenVisible}))
  }

  handleFullscreen = (event) => {
    event.preventDefault()
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      this.setState({isFullscreen: false})
    } else {
      // const element = this.container
      if (document.body.requestFullscreen) {
        document.body.requestFullscreen()
      } else if (document.body.mozRequestFullScreen) {
        document.body.mozRequestFullScreen()
      } else if (document.body.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
      } else if (document.body.msRequestFullscreen) {
        document.body.msRequestFullscreen()
      }
      this.setState({isFullscreen: true})
    }
  }

  render() {
    const {nav, error, onReload} = this.props
    const {isHiddenVisible, isFullscreen} = this.state
    return (
      <div ref={this.saveContainer} className={style.normal}>
        <div className={style.tableHeader}>
          <TableChangeContainer />
          <ColumnsContainer />
        </div>
        <TableContainer isHiddenVisible={isHiddenVisible} key={nav.project} />
        <Footer
          error={error}
          isFullscreen={isFullscreen}
          onReload={onReload}
          onFullscreen={this.handleFullscreen}
          isHiddenVisible={isHiddenVisible}
          onShowHidden={this.handleToggle}
        />
      </div>
    )
  }
}

export default TableWrap

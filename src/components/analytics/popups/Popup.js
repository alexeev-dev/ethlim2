import React, {Component} from 'react'

import style from './styles/Popup.module.scss'

class Popup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMoving: false,
      zIndex: props.zIndex + 1,
      diffX: 0,
      diffY: 0,
      posX: '',
      posY: ''
    }
  }

  componentDidMount() {
    const {clientWidth, clientHeight} = this.popup
    const {innerWidth, innerHeight} = window
    const posX = (innerWidth - clientWidth) / 2
    const posY = (innerHeight - clientHeight) / 2
    this.setState({posX, posY})
  }

  savePopup = ref => this.popup = ref

  handleClose = event => {
    event.preventDefault()
    const {id, onClose} = this.props

    if (typeof onClose === 'function') {
      onClose(id)
    }
  }

  handleStart = event => {
    const {pageX, pageY} = event
    const {offsetLeft, offsetTop} = this.popup
    const {zIndex, onZIndex} = this.props
    const newZIndex = zIndex + 1

    this.setState({
      isMoving: true,
      zIndex: newZIndex,
      diffX: pageX - offsetLeft,
      diffY: pageY - offsetTop
    })

    if (typeof onZIndex === 'function') {
      onZIndex(newZIndex)
    }
  }

  handleMove = event => {
    const {pageX, pageY} = event
    const {isMoving, diffX, diffY} = this.state
    if (isMoving) {
      const posX = pageX - diffX
      const posY = pageY - diffY
      this.setState({posX, posY})
    }
  }

  handleEnd = event => {
    this.setState({isMoving: false})
  }

  render() {
    const {isActive, title, onHover, onLeave, children} = this.props
    const {posX, posY, isMoving, zIndex} = this.state
    return (
      <div
        className={isActive && isMoving ? style.wrapActive : style.wrap}
        onMouseMove={this.handleMove}
        onMouseLeave={this.handleEnd}
        style={{zIndex}}
      >
        <div
          className={isActive ? style.active : style.popup}
          ref={this.savePopup}
          style={{left: posX, top: posY}}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          <div
            className={style.header}
            onMouseDown={this.handleStart}
            onMouseUp={this.handleEnd}
          >
            <button className={style.close} onClick={this.handleClose}></button>
            <h2 className={style.title}>{title}</h2>
          </div>
          <div className={style.body}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default Popup

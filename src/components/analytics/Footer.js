import React, {Component} from 'react'

import {TableError} from './'
import {Icon} from 'components/utility'
import style from './styles/Footer.module.scss'

class Footer extends Component {
  // handleToggle = () => {
  //   const {onShowHidden} = this.props
  //
  //   if (typeof onShowHidden === 'function') {
  //     onShowHidden()
  //   }
  // }

  render() {
    const {error, isFullscreen, onReload, onFullscreen} = this.props
    return (
      <div className={style.normal}>
        <div className={style.hidden}>
          {/* <Checkbox id="checked" isActive={isHiddenVisible} onToggle={this.handleToggle} />
          <span className={style.text}>show hidden</span> */}
        </div>
        {error && <TableError error={error} onReload={onReload} />}
        <button className={style.fullscreen} onClick={onFullscreen}><Icon className={style.fullscreenIcon} icon={!isFullscreen ? 'fullscreen' : 'fullscreen-exit'} /></button>
      </div>
    )
  }
}

export default Footer

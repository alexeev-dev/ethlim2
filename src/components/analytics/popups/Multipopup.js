import React, {Component} from 'react'
import {Popup, Funnel, Bid, Switcher} from 'components/analytics'

class Multipopup extends Component {
  getPopupContent() {
    const {popup, params, adjustmentColumns, onAction} = this.props

    switch (popup.type) {
      case 'funnel':
        return <Funnel popup={popup} />
      case 'sources':
        return <Switcher popup={popup} />
      case 'bid':
        return <Bid
          popup={popup}
          params={params}
          adjustmentColumns={adjustmentColumns}
          onChange={onAction}
        />
      // case 'source':
      //   return <SourceContainer onChange={onAction} />
      default:
        return <div>Modal window is not defined: {popup.type}</div>
    }
  }

  render() {
    const {popup, zIndex, onClose, onZIndex} = this.props
    const loadingStatus = popup === null ? 'loading' : 'ready'
    return <Popup
      key={loadingStatus}
      id={popup.id}
      isActive={true}
      title={popup.title}
      zIndex={zIndex}
      onZIndex={onZIndex}
      onClose={onClose}
    >
      {this.getPopupContent()}
    </Popup>
  }
}

export default Multipopup

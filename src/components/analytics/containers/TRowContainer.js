import {connect} from 'react-redux'

import {TRow} from 'components/analytics'

import {getRowData} from 'services/app/selectors'
import {toggleAd, toggleRow, selectRows, openPopup} from 'services/analytics/actions'

const mapStateToProps = (state, {id}) => ({
  row: getRowData(state, id)
})

const mapDispatchToProps = (dispatch) => ({
  onAction(type, payload) {
    switch(type) {
      case 'toggle':
        dispatch(toggleRow(payload))
        break;
      case 'shift':
        dispatch(selectRows(payload))
        break;
      case 'popup':
        dispatch(openPopup(payload))
        break;
      default:
        console.log('undefined type: ' + type)
    }
  },

  onVisible(id) {
    dispatch(toggleAd(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TRow)

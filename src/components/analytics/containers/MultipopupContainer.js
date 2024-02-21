import {connect} from 'react-redux'
import * as app from 'services/app/selectors'
import {Multipopup} from 'components/analytics'
import {closePopup, changeBid} from 'services/analytics/actions'

const mapStateToProps = (state, {popup}) => ({
  popup: app.getPopupData(state, popup),
  params: app.getAllParams(state),
  adjustmentColumns: app.isAdjustmentColumns(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClose(id) {
    dispatch(closePopup(id))
  },

  onAction(action, payload) {
    if (action === 'changeBid') {
      dispatch(changeBid(payload))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Multipopup)

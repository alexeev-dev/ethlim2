import {connect} from 'react-redux'

import {TableChange} from 'components/analytics'
import * as app from 'services/app/selectors'
import {selectTable} from 'services/analytics/actions'

const mapStateToProps = (state) => ({
  tabs: app.getTabsList(state)
})

const mapDispatchToProps = (dispatch) => ({
  onAction(tab) {
    dispatch(selectTable(tab))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableChange)

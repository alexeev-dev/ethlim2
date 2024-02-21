import {connect} from 'react-redux'

import {Sources} from 'components/header'

import * as app from 'services/app/selectors'
import {selectTrafficSource} from 'services/navigation/actions'

const mapStateToProps = (state) => ({
  sources: app.getTrafficSources(state)
})

const mapDispatchToProps = (dispatch) => ({
  onAction(id) {
    dispatch(selectTrafficSource(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sources)

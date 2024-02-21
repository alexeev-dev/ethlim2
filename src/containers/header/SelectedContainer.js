import {connect} from 'react-redux'

import {Selected} from 'components/header'
import * as app from 'services/app/selectors'
import {fetchTrafficSources} from 'services/navigation/actions'

function mapStateToProps(state) {
  const status = app.getTrafficSources(state)
  const nav = {
    source: app.getSelectedTrafficSource(state),
    traffic: app.getSelectedPlatform(state),
    project: app.getSelectedProject(state)
  }
  return {
    status,
    nav
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAction() {
    dispatch(fetchTrafficSources())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Selected)

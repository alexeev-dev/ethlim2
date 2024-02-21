import {connect} from 'react-redux'
import * as app from 'services/app/selectors'
import {reset, fetchRows} from 'services/analytics/actions'
import {Table} from 'components/analytics'

const mapStateToProps = (state) => {
  return {
    // cluster: app.getCurrentCluster(state),
    status: app.getCurrentTableStatus(state),
    loadStatus: app.canLoadRows(state),
    currentTab: app.getCurrentTab(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  onClusterChange(cluster) {
    // dispatch(goToCluster(cluster))
  },
  onEnd() {
    dispatch(fetchRows())
  },
  onReady() {
    dispatch(reset())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)

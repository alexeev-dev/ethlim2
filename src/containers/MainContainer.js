import {connect} from 'react-redux'
import {Main} from 'components/page'
import {withRouter} from "react-router-dom"

import {getAuthStatus, timelineHasMore, timelineIsPending, getProjectStatus} from 'services/app/selectors'
import {fetchTimeline} from 'services/timeline/actions'

const mapStateToProps = (state) => ({
  isAuth: getAuthStatus(state),
  hasMore: timelineHasMore(state),
  isPending: timelineIsPending(state),
  isProjectSelected: getProjectStatus(state)
})

const mapDispatchToProps = (dispatch) => ({
  onScroll() {
    dispatch(fetchTimeline())
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

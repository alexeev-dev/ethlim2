import {connect} from 'react-redux'
import React from 'react'

import * as app from 'services/app/selectors'
import {History} from 'components/timeline'
import {fetchTimeline} from 'services/timeline/actions'

const mapStateToProps = (state) => ({
  nav: app.getNavPosition(state),
  token: app.getAuthToken(state),
  page: app.getTimelinePage(state),
  groups: app.getTimelineItems(state),
  hasMore: app.timelineHasMore(state),
  hasError: app.timelineHasError(state),
  isPending: app.timelineIsPending(state)
})

const mapDispatchToProps = (dispatch) => ({
  onEnter() {
    dispatch(fetchTimeline(1))
  },

  onNeedMore() {
    dispatch(fetchTimeline())
  }
})

const AuthGuard = (props) => (
  <History key={props.nav.project} {...props}/>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthGuard)

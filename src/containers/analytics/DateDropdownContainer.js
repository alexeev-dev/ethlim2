import {connect} from 'react-redux'
import {DateDropdown} from 'components/analytics'

import * as app from 'services/app/selectors'
import * as timeline from 'services/timeline/actions'
import * as analytics from 'services/analytics/actions'
import {withRouter} from 'react-router'

const mapStateToProps = (state, {location}) => ({
  date: location.pathname === '/'
    ? app.getAnalyticsFilter(state, 'date')
    : app.getTimelineFilter(state, 'date')
})

const mapDispatchToProps = (dispatch, {location}) => ({
  onRange(value) {
    if (location.pathname === '/') {
      dispatch(analytics.changeFilter('date', value))
    } else if (location.pathname === '/timeline') {
      dispatch(timeline.changeFilter('date', value))
    }
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DateDropdown))

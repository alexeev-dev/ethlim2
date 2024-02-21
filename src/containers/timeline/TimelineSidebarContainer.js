import {connect} from 'react-redux'

import * as app from 'services/app/selectors'
import {Sidebar} from 'components/timeline'
import {changeFilter} from 'services/timeline/actions'

const mapStateToProps = (state) => ({
  currentType: app.getTimelineFilter(state, 'type')
})

const mapDispatchToProps = (dispatch) => ({
  onChange(value) {
    dispatch(changeFilter('type', value))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)

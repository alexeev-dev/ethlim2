import {connect} from 'react-redux'

import {ActiveFilters} from 'components/analytics'
import * as app from 'services/app/selectors'
import {removeValue} from 'services/analytics/actions'

const mapStateToProps = (state) => ({
  filters: app.getFiltersList(state)
})

const mapDispatchToProps = (dispatch) => ({
  onRemove(id, value) {
    dispatch(removeValue(id, value))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveFilters)

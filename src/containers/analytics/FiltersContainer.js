import {connect} from 'react-redux'

import {Filters} from 'components/analytics'
import * as app from 'services/app/selectors'
import {resetFilters} from 'services/analytics/actions'

const mapStateToProps = (state) => ({
  filters: app.getMultiFilters(state)
})

const mapDispatchToProps = (dispatch) => ({
  onLoad() {
    console.log('load filters')
  },

  onSave() {
    console.log('save filters')
  },

  onReset() {
    dispatch(resetFilters())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters)

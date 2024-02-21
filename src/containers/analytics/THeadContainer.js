import {connect} from 'react-redux'

import {THead} from 'components/analytics'

import * as app from 'services/app/selectors'
import {toggleSorting} from 'services/analytics/actions'

const mapStateToProps = (state) => ({
  columns: app.getActiveColumns(state),
  sorting: app.getTableSorting(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSort(name) {
    dispatch(toggleSorting(name))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(THead)

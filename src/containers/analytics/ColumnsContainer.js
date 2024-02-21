import {connect} from 'react-redux'

import {Columns} from 'components/analytics'

import {toggleColumn} from 'services/columns/actions'

const mapStateToProps = (state) => ({
  status: state.columns.status
})

const mapDispatchToProps = (dispatch) => ({
  onChange(name) {
    dispatch(toggleColumn(name))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Columns)

import {connect} from 'react-redux'

import {getAllParams} from 'services/app/selectors'
import {changeParam} from 'services/params/actions'

import {TableParams} from 'components/analytics'

const mapStateToProps = (state) => ({
  params: getAllParams(state)
})

const mapDispatchToProps = (dispatch) => ({
  onChange(name, value) {
    dispatch(changeParam(name, value))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableParams)

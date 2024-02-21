import {connect} from 'react-redux'

import {TableSearch} from 'components/analytics'
import {updateSearch, toggleSearch} from 'services/analytics/actions'
import {applySearch} from 'services/analytics/actions'
import * as app from 'services/app/selectors'

const mapStateToProps = (state) => ({
  type: app.getSearchType(state),
  phrase: app.getSearchPhrase(state)
})

const mapDispatchToProps = (dispatch) => ({
  onChange(phrase) {
    dispatch(updateSearch(phrase))
  },

  onToggle() {
    dispatch(toggleSearch())
  },

  onSubmit() {
    dispatch(applySearch())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSearch)

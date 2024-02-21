import * as app from 'services/app/selectors'
import {TableWrap} from 'components/analytics'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  nav: app.getNavPosition(state),
  error: app.getCurrentError(state)
})

const mapDispatchToProps = (dispatch) => ({
  onReload(reloadAction) {
    dispatch(reloadAction)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableWrap)

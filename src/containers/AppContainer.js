import {connect} from 'react-redux'

import App from 'components/app'

import * as auth from 'services/auth/actions'
import {SUCCESS} from 'services/utils/actions'
import {changePage} from 'services/app/actions'

const mapStateToProps = (state) => ({
  isAuth: !!state.auth.token
})

const mapDispatchToProps = (dispatch) => ({
  onReady() {
    const savedToken = localStorage.getItem('api-auth-token')
    if (savedToken !== null) {
      dispatch(auth.login(SUCCESS, savedToken))
    }
  },
  onLocationChange(location) {
    dispatch(changePage(location.pathname))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

import {connect} from 'react-redux'

import {Login} from 'components/auth'
import * as auth from 'services/auth/actions'

const mapDispatchToProps = (dispatch) => ({
  onSubmit({username, password, remember}) {
    dispatch(auth.login(username, password, remember))
  },

  onForgotPass() {
    console.log('forgot pass')
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Login)

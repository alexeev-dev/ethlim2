import {connect} from 'react-redux'

import {Registration} from 'components/auth'

const mapDispatchToProps = (dispatch) => ({
  onSubmit(user) {
    console.log(user)
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Registration)

import {connect} from 'react-redux'

import {User} from 'components/header'

const mapDispatchToProps = (dispatch, {onUser}) => ({
  onUser,

  onClick(name) {
    console.log(name)
  }
})

export default connect(
  null,
  mapDispatchToProps
)(User)

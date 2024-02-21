import {connect} from 'react-redux'

import {Header} from 'components/header'

import {getAuthStatus, getProjectStatus} from 'services/app/selectors'

const mapStateToProps = (state) => ({
  isAuth: getAuthStatus(state),
  isProjectSelected: getProjectStatus(state)
})

export default connect(
  mapStateToProps,
  null
)(Header)

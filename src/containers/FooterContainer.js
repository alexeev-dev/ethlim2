import {connect} from 'react-redux'

import {Footer} from 'components/footer'

import {getProjectStatus} from 'services/app/selectors'

const mapStateToProps = (state) => ({
  isProjectSelected: getProjectStatus(state)
})

export default connect(
  mapStateToProps,
  null
)(Footer)

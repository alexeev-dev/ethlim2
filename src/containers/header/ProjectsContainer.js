import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {Projects} from 'components/header'

import * as app from 'services/app/selectors'
import {selectProject} from 'services/navigation/actions'

const mapStateToProps = (state) => ({
  projects: app.getProjects(state)
})

const mapDispatchToProps = (dispatch, {location, onProjectSelected}) => ({
  onAction(id) {
    onProjectSelected(id)
    dispatch(selectProject(id, location.pathname))
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects))

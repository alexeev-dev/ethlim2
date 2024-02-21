import {connect} from 'react-redux'

import {Platforms} from 'components/header'

import * as app from 'services/app/selectors'
import {selectPlatform} from 'services/navigation/actions'

const mapStateToProps = (state) => ({
  platforms: app.getPlatforms(state)
})

const mapDispatchToProps = (dispatch) => ({
  onAction(id) {
    dispatch(selectPlatform(id))
  }
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Platforms)

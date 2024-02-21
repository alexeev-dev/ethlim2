import {connect} from 'react-redux'
import * as app from 'services/app/selectors'
import {SwitcherRow} from 'components/analytics'
import {toggleSource} from 'services/analytics/actions'

const mapStateToProps = (state, {id}) => {
  const nav = app.getNavPosition(state)
  return {
    row: app.getSourcesItem(state, id),
    platform: nav.platform
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  onToggle(targetRow) {
    dispatch(toggleSource(targetRow))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SwitcherRow)

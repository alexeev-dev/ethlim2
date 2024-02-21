import * as app from 'services/app/selectors'
import {TBody} from 'components/analytics'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  const rows = app.getTableRows(state)
  return {
    rows,
    before: 0,
    after: 0,
    columns: app.getActiveColumns(state),
    params: app.getAdjustmentParams(state)
  }
}

export default connect(mapStateToProps)(TBody)

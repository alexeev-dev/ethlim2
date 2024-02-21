import {connect} from 'react-redux'

import {Source} from 'components/analytics'

const mapStateToProps = (state) => ({
  traffic_source_id: state.params.traffic_source_id,
  platform_id: state.params.platform_id,
})

export default connect(
  mapStateToProps
)(Source)

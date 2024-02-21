import {connect} from 'react-redux'
import {Wrap} from 'components/analytics'
import {getAnalyticsPopups} from 'services/app/selectors'

const mapStateToProps = (state) => ({
  popups: getAnalyticsPopups(state)
})

export default connect(mapStateToProps)(Wrap)

import {combineReducers} from 'redux'
import columns from '../columns'
import auth from '../auth'
import params from '../params'
import timeline from '../timeline'
import navigation from '../navigation'
import analytics from '../analytics'

export default combineReducers({
  auth, columns, params, timeline,
  navigation, analytics
})

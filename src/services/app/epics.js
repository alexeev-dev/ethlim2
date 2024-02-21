import {fetchTimelineEpic} from 'services/timeline/epics'
import {fetchNavigationEpic, selectNavigationEpic} from 'services/navigation/epics'
import {authEpic} from '../auth/epics'
import {combineEpics} from 'redux-observable'
import analyticsEpics from 'services/analytics/epics'

export default combineEpics(
  authEpic, fetchTimelineEpic,
  fetchNavigationEpic, selectNavigationEpic,
  analyticsEpics
)

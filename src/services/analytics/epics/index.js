import {combineEpics} from 'redux-observable'
import fetchTableEpic from './fetchTable'
import selectTableEpic from './selectTable'
import fetchValuesEpic from './fetchValues'
import fetchRowsEpic from './fetchRows'
import fetchBidsEpic from './fetchBids'
import changeBidEpic from './changeBid'
import toggleAdEpic from './toggleAd'
import fetchDeltaEpic from './fetchDelta'
import fetchSourcesEpic from './fetchSources'
import toggleSourceEpic from './toggleSource'

export default combineEpics(
  fetchTableEpic, selectTableEpic,
  fetchValuesEpic, fetchRowsEpic,
  fetchBidsEpic, changeBidEpic,
  toggleAdEpic, fetchSourcesEpic,
  fetchDeltaEpic, toggleSourceEpic
)

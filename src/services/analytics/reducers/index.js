import table from './table'
import rows from './rows'
import nextId from './counter'
import filters from './filters'
import sorting from './sorting'
import currentTab from './tabs'
import popups from './popups'
import bids from './bids'
import sources from './sources'

export default combineReducers({
  campaigns: table('campaigns'),
  groups: table('groups'),
  phrases: table('phrases'),
  ads: table('ads'),
  regions: table('regions'),
  offers: table('offers'),
  filters, sorting, currentTab,
  rows, nextId, popups, bids, sources
})

function combineReducers(stateShape) {
  return function analyticsReducer(state, action) {
    return Object.getOwnPropertyNames(stateShape)
      .reduce((result, name) => {
        result[name] = typeof state !== 'undefined'
          ? stateShape[name](state[name], action, state)
          : stateShape[name](undefined, action, {})
        return result
      }, {})
  }
}

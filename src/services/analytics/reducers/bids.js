import {SUCCESS} from 'services/utils/actions'
import * as actions from '../actions'

function bidsReducer(state = {}, action) {
  switch (action.type) {
    case actions.RESET:
      return {}
    case actions.FETCH_BIDS_HISTORY:
      return fetchBidsHistory(state, action)
    default:
      return state
  }
}

function fetchBidsHistory(state, {status, payload}) {
  if (status === SUCCESS) {
    const {id, response} = payload
    return {
      ...state,
      [id]: loadBidsHistory(id, response)
    }
  }
  return state
}

function loadBidsHistory(id, response) {
  const bid = Math.round(response.bid / 10000) / 100
  const {updates} = response
  return {
    id, bid,
    changes: restoreHistory(response.bid, updates)
  }
}

function restoreHistory(base, history) {
  const diffs = history.slice()
    .reverse()
    .reduce(accumulateDiffs, [0])
    .reverse()
    .slice(1)
  return history.map(withValue(base, diffs))
}

function accumulateDiffs(diffs, current, index) {
  const diff = diffs[index] + current.difBid
  return diffs.concat(diff)
}

function withValue(base, diffs) {
  return (item, index) => {
    return {
      date: item.created.slice(0, 10),
      value: Math.round(item.bid_value / 10000) / 100,
      diff: Math.round(item.bid_difference / 10000) / 100,
      message: item.message,
      user: item.user
    }
  }
}

export default bidsReducer

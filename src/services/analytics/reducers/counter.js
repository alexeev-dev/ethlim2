import {SUCCESS} from 'services/utils/actions'
import * as actions from '../actions'

function counterReducer(state = 1, action) {
  switch (action.type) {
    case actions.RESET:
      return 1
    case actions.FETCH_TABLE:
    case actions.FETCH_ROWS:
      return fetchTable(state, action)
    case actions.OPEN_POPUP:
      return state + 1
    default:
      return state
  }
}

function fetchTable(state, {status, payload}) {
  if (status === SUCCESS) {
    return state + payload.response.data.length
  }
  return state
}

export default counterReducer

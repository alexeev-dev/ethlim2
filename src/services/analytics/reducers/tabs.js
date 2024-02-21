import {RESET, SELECT_TABLE} from '../actions'

function tabsReducer(state = 'campaigns', action) {
  switch (action.type) {
    case SELECT_TABLE:
      return action.payload
    case RESET:
      return 'campaigns'
    default:
      return state
  }
}

export default tabsReducer

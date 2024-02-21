import {TOGGLE_SORTING} from '../actions'

const initialState = {
  target: 'CPC',
  isAscending: false
}

function sortingReducer(state = initialState, action) {
  if (action.type === TOGGLE_SORTING) {
    return {
      target: action.payload,
      isAscending: action.payload === state.target
        ? !state.isAscending
        : false
    }
  }
  return state
}

export default sortingReducer

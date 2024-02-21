import immutable from 'object-path-immutable'
import {CHANGE} from './actions'

const initialState = {
  clicks: 20,
  troi: 110,
  tcost: 200,
  rate: {min: 5, max: 30},
  adjustmentMax: 0
}

function paramsReducer(state = initialState, action) {
  const {type, payload} = action
  if (type === CHANGE) {
    return immutable.set(state, payload.name, payload.value)
  }
  return state
}

export default paramsReducer

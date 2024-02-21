import immutable from 'object-path-immutable'
import {LOGIN, LOGOUT} from './actions'
import {SUCCESS, ERROR} from '../utils/actions'

export const initialState = {
  error: false,
  token: null
}

function authReducer(state = initialState, action) {
  const {type, status, payload} = action
  switch (type) {
    case LOGIN:
      switch (status) {
        case SUCCESS:
          return immutable.merge(state, [], {
            token: payload || null,
            error: payload === null
          })
        case ERROR:
          return immutable.merge(state, [], {
            token: null,
            error: true
          })
        default:
          return state
      }
    case LOGOUT:
      return immutable.merge(state, [], {
        token: null,
        error: false
      })
    default:
      return state
  }
}

export default authReducer

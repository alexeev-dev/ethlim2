import {SUCCESS, ERROR} from 'services/utils/actions'
import immutable from 'object-path-immutable'
import * as actions from '../actions'

const initialState = {
  byId: {},
  ids: []
}

function popupsReducer(state = initialState, action, fullState) {
  switch (action.type) {
    case actions.RESET:
      return initialState
    case actions.OPEN_POPUP:
      return openPopup(state, action, fullState)
    case actions.CLOSE_POPUP:
      return closePopup(state, action)
    case actions.CHANGE_BID:
      return changeBid(state, action)
    default:
      return state
  }
}

function openPopup(state, {payload}, fullState) {
  const {type, target} = payload
  if (!hasSamePopup(state, payload, fullState)) {
    const {nextId} = fullState
    return {
      byId: {
        ...state.byId,
        [nextId]: makeNewPopup(nextId, type, target, fullState)
      },
      ids: state.ids.concat(nextId)
    }
  }
  return state
}

function makeNewPopup(id, type, rawTarget, fullState) {
  const target = collapseTarget(type, rawTarget, fullState)
  const base = {id, type, target}
  return type === 'bid'
    ? {...base, opStatus: 'none'}
    : base
}

function hasSamePopup(state, payload, fullState) {
  const {ids, byId} = state
  return ids.some(id => isEqual(byId[id], payload, fullState))
}

function isEqual(popup, {type, target}, fullState) {
  return (
    type === popup.type &&
    popup.target === collapseTarget(type, target, fullState)
  )
}

function collapseTarget(popupType, target, fullState) {
  const row = fullState.rows[target]
  const {isSelected} = row.meta
  const {type} = row.attributes.entity
  return popupType !== 'sources'
    ? !isSelected ? target : type
    : target
}

function closePopup(state, {payload}) {
  return {
    byId: state.byId,
    ids: state.ids.filter(id => id !== payload)
  }
}

function changeBid(state, {status, payload}) {
  const path = ['byId', payload.popupId, 'opStatus']
  switch (status) {
    case SUCCESS:
      return immutable.set(state, path, 'done')
    case ERROR:
      return immutable.set(state, path, 'error')
    default:
      return immutable.set(state, path, 'updating')
  }
}

export default popupsReducer

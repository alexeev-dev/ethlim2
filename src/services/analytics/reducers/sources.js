import {SUCCESS, ERROR} from 'services/utils/actions'
import immutable from 'object-path-immutable'
import * as actions from '../actions'

const initialState = {
  byId: {},
  lists: {},
  nextId: 1
}

function sourcesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.RESET:
      return initialState
    case actions.FETCH_SOURCES:
      return handleSources(state, action)
    case actions.TOGGLE_SOURCE:
      return handleSourceToggle(state, action)
    default:
      return state
  }
}

function handleSources(state, {status, payload}) {
  if (status === SUCCESS) {
    const {id, campaign, response} = payload
    return {
      byId: loadSources(response, campaign, state),
      lists: updateList(id, response, state),
      nextId: updateCounter(response, state)
    }
  }
  return state
}

function handleSourceToggle(state, {status, payload}) {
  if (typeof status === 'undefined') {
    return immutable.update(state, ['byId', payload], (item) => ({
      ...item, opStatus: 'updating',
      isExcluded: !item.isExcluded
    }))
  }

  if (status === SUCCESS) {
    return immutable.update(state, ['byId', payload], (item) => ({
      ...item, opStatus: 'done'
    }))
  }

  if (status === ERROR) {
    return immutable.update(state, ['byId', payload], (item) => ({
      ...item, opStatus: 'error',
      isExcluded: !item.isExcluded
    }))
  }

  return state
}

function loadSources(response, campaign, {byId, nextId}) {
  return response.reduce((result, item, index) => ({
    ...result, [nextId + index]: {
      campaign,
      id: nextId + index,
      type: 'sources',
      name: item.name,
      opStatus: 'none',
      isExcluded: item.excluded
    }
  }), byId)
}

function updateList(id, response, {lists, nextId}) {
  return {
    ...lists, [id]: {
      id, status: 'done',
      opStatus: 'done',
      items: response.map((_, i) => nextId + i)
    }
  }
}

function updateCounter(response, {nextId}) {
  return nextId + response.length
}

export default sourcesReducer

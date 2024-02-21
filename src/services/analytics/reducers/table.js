import {SUCCESS, ERROR} from 'services/utils/actions'
import immutable from 'object-path-immutable'
import * as actions from '../actions'
import {getEntityId} from './rows'

export const FETCHING = 'FETCHING'
export const OUTDATED = 'OUTDATED'
export const DONE = 'DONE'
export const END = 'END'

const campaigns = {
  latestSelected: null,
  status: FETCHING,
  deltaStatus: FETCHING,
  rowsStatus: DONE,
  search: {
    type: 'byName',
    byId: '',
    byName: '',
    applied: {
      type: 'byName',
      phrase: ''
    }
  },
  idsMap: {},
  rows: [],
  page: 1
}

const sublevels = {
  ...campaigns,
  deltaStatus: DONE,
  status: OUTDATED
}

function makeTableReducer(tableType) {
  const initialState = tableType === 'campaigns' ? campaigns : sublevels
  return function tableReducer(state = initialState, action, fullState) {
    switch (action.type) {
      case actions.RESET:
        return initialState
      case actions.FETCH_TABLE:
        return fetchTable(state, action, fullState, tableType)
      case actions.FETCH_DELTA:
        return fetchDelta(state, action, tableType)
      case actions.FETCH_ROWS:
        return fetchRows(state, action, fullState, tableType)
      case actions.TOGGLE_ROW:
      case actions.SELECT_ROWS:
        return toggleRow(state, action, fullState, tableType)
      case actions.CHANGE_FILTER:
      case actions.SELECT_VALUE:
      case actions.REMOVE_VALUE:
      case actions.RESET_FILTERS:
      case actions.TOGGLE_SORTING:
        return changeFilter(state, fullState, tableType)
      case actions.UPDATE_SEARCH:
        return updateSearch(state, action, fullState, tableType)
      case actions.TOGGLE_SEARCH:
        return toggleSearch(state, fullState, tableType)
      case actions.APPLY_SEARCH:
        return applySearch(state, fullState, tableType)
      default:
        return state
    }
  }
}

function fetchTable(state, {status, payload}, {nextId}, tableType) {
  const target = status ? payload.target : payload

  if (target !== tableType) {
    return state
  }

  if (typeof status === 'undefined') {
    return {
      latestSelected: null,
      rows: [], idsMap: {},
      status: FETCHING,
      deltaStatus: FETCHING,
      rowsStatus: DONE,
      search: state.search,
      page: 1
    }
  }

  if (status === SUCCESS) {
    const {response} = payload
    const rows = response.data
    return immutable.merge(state, [], {
      rows: rows.map((_, i) => nextId + i),
      status: rows.length > 0 ? DONE : END,
      rowsStatus: DONE,
      idsMap: loadIdsMap({}, rows, nextId, target)
    })
  }

  if (status === ERROR) {
    return immutable.merge(state, [], {
      status: {
        message: payload.error.message,
        reload: actions.fetchTable(target)
      },
      deltaStatus: DONE,
      rowsStatus: DONE
    })
  }

  return state
}

function fetchDelta(state, {status, payload}, tableType) {
  const target = status ? payload.target : payload
  if (target !== tableType) {
    return state
  }

  if (typeof status === 'undefined') {
    return immutable.set(state, 'deltaStatus', FETCHING)
  }

  if (status === SUCCESS) {
    return immutable.set(state, 'deltaStatus', DONE)
  }

  if (status === ERROR) {
    return immutable.set(state, 'deltaStatus', {
      message: payload.error.message,
      reload: actions.fetchDelta(payload)
    })
  }

  return state
}

function toggleRow(state, {type, payload}, {rows}, tableType) {
  const row = rows[payload]

  if (row.attributes.entity.type === tableType) {
    return {...state, latestSelected: payload}
  }

  if (isOutdated(row, tableType)) {
    return {
      latestSelected: null,
      status: OUTDATED,
      deltaStatus: DONE,
      rowsStatus: DONE,
      search: campaigns.search,
      idsMap: {},
      rows: [],
      page: 1
    }
  }
  return state
}

function changeFilter(state, {currentTab}, tableType) {
  if (currentTab === tableType) {
    return {
      ...state,
      status: FETCHING,
      deltaStatus: FETCHING,
      rowsStatus: DONE
    }
  }
  return {
    ...state,
    status: OUTDATED,
    deltaStatus: DONE,
    rowsStatus: DONE
  }
}

function fetchRows(state, {status, payload}, {nextId, currentTab}, tableType) {
  const target = status
    ? payload.target
    : typeof payload !== 'undefined'
      ? payload
      : currentTab

  if (target !== tableType) {
    return state
  }

  if (typeof status === 'undefined') {
    return state.status === DONE && state.deltaStatus === DONE
      ? immutable.merge(state, [], {
        rowsStatus: FETCHING,
        deltaStatus: FETCHING
      }) : state
  }

  if (status === SUCCESS) {
    const {response} = payload
    const rows = response.data
    return immutable.merge(state, [], {
      rows: state.rows.concat(rows.map((_, i) => nextId + i)),
      status: rows.length > 0 ? state.status : END,
      rowsStatus: DONE,
      idsMap: loadIdsMap(state.idsMap, rows, nextId, target),
      page: state.page + 1
    })
  }

  if (status === ERROR) {
    const {error, target} = payload
    return immutable.set(state, 'rowsStatus', {
      message: error.message,
      reload: actions.fetchRows(target)
    })
  }

  return state
}

function isOutdated(row, tableType) {
  const {type} = row.attributes.entity
  switch (tableType) {
    case 'campaigns':
      return false
    case 'groups':
    case 'regions':
      return type === 'campaigns'
    case 'ads':
    case 'phrases':
    case 'offers':
      return type === 'campaigns' || type === 'groups'
    default:
      return false
  }
}

function loadIdsMap(prevMap, newRows, nextId, target) {
  return newRows.reduce((result, row, i) => ({
    ...result, [getEntityId(row, target)]: nextId + i
  }), prevMap)
}

function updateSearch(state, {payload}, {currentTab}, table) {
  if (table === currentTab) {
    return immutable.update(state, ['search'], (prev) => ({
      ...prev, [prev.type]: payload
    }))
  }
  return state
}

function toggleSearch(state, {currentTab}, table) {
  if (table === currentTab) {
    return immutable.update(state, ['search', 'type'], (prev) => (
      prev === 'byId' ? 'byName' : 'byId'
    ))
  }
  return state
}

function applySearch(state, {currentTab}, table) {
  if (table === currentTab) {
    return immutable.update(state, ['search'], (prev) => ({
      ...prev, applied: {
        type: prev.type,
        phrase: prev[prev.type]
      }
    }))
  }
  return state
}

export default makeTableReducer

import {getToday, getMonthBefore} from 'services/utils/date'
import immutable from 'object-path-immutable'
import * as actions from '../actions'
import {FETCHING, DONE} from './table'
import {SUCCESS} from 'services/utils/actions'
import * as filters from '../data/filters'

const multiselect = {
  isOpen: false,
  status: DONE,
  byId: {},
  all: [],
  date: null,
  search: '',
  cluster: 0
}

const initialState = {
  date: {
    from: getMonthBefore(),
    to: getToday()
  },
  regions: multiselect,
  themes: multiselect,
  ads: multiselect
}

function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_FILTER:
      return changeFilter(state, action)
    case actions.FETCH_VALUES:
      return fetchValues(state, action)
    case actions.SELECT_VALUE:
      return selectValue(state, action)
    case actions.TOGGLE_DROPDOWN:
      return toggleDropdown(state, action)
    case actions.SEARCH_VALUE:
      return searchValue(state, action)
    case actions.REMOVE_VALUE:
      return removeValue(state, action)
    case actions.RESET_FILTERS:
      return resetFilters(state, action)
    default:
      return state
  }
}

function changeFilter(state, action) {
  const {name, value} = action.payload
  const updated = immutable.set(state, name, value)
  return name === 'date' ? closeMultiselect(updated) : updated
}

function fetchValues(state, {status, payload}) {
  if (typeof status === 'undefined') {
    return immutable.set(state, [payload, 'status'], FETCHING)
  }
  if (status === SUCCESS) {
    const {date, filter, response} = payload
    return immutable.set(state, [filter], {
      status: DONE,
      isOpen: state[filter].isOpen,
      byId: loadValues(response, filter, state[filter].byId),
      all: response.map(item => filter === 'regions' ? item[0] : item),
      date, search: '', cluster: 0
    })
  }
  return state
}

function selectValue(state, {payload}) {
  const {id, value} = payload
  return immutable.set(state, [
    id, 'byId', value, 'isSelected'
  ], true)
}

function toggleDropdown(state, {payload}) {
  return immutable.update(state, [payload, 'isOpen'], v => !v)
}

function searchValue(state, {payload}) {
  const {id, value} = payload
  return immutable.set(state, [id, 'search'], value)
}

function removeValue(state, {payload}) {
  const {id, value} = payload
  return immutable.set(state, [id, 'byId', value, 'isSelected'], false)
}

function resetFilters(state, action) {
  return filters.multiselect
    .reduce((result, name) => resetMultiselect(result, name), state)
}

function closeMultiselect(state) {
  return filters.multiselect
    .reduce((result, name) => immutable.set(
      result, [name, 'isOpen'], false
    ), state)
}

function resetMultiselect(state, name) {
  const {all, byId} = state[name]
  const updated = all.reduce((result, id) => ({
    ...result, [id]: {...byId[id], isSelected: false}
  }), {})
  return immutable.set(state, [name, 'byId'], updated)
}

function loadValues(response, type, oldValues) {
  return response.reduce((result, item) => {
    const id = type === 'regions' ? item[0] : item
    const title = type === 'regions' ? item[1] : item
    const oldValue = oldValues[id]
    return {
      ...result, [id]: {
        id, title,
        isSelected: typeof oldValue !== 'undefined'
          ? oldValue.isSelected
          : false
      }
    }
  }, {})
}

export default filtersReducer

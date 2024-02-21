import {SUCCESS, ERROR} from 'services/utils/actions'
import immutable from 'object-path-immutable'
import * as actions from '../actions'

const idName = {
  campaigns: 'camp_id',
  groups: 'group_id',
  phrases: 'phrase',
  ads: 'ad_id',
  regions: 'region_id',
  offers: 'offer_id'
}

const isNotMetric = {
  camp_id: true,
  group_id: true,
  phrase: true,
  ad_id: true,
  source: true,
  name: true,
  ad_name: true,
  regions: true,
  state: true
}

function rowsReducer(state = {}, action, fullState) {
  switch (action.type) {
    case actions.RESET:
      return {}
    case actions.FETCH_TABLE:
    case actions.FETCH_ROWS:
      return fetchTable(state, action, fullState)
    case actions.FETCH_DELTA:
      return fetchDelta(state, action, fullState)
    case actions.TOGGLE_ROW:
      return toggleRow(state, action)
    case actions.TOGGLE_AD:
      return toggleAd(state, action)
    case actions.SELECT_ROWS:
      return selectRows(state, action, fullState)
    default:
      return state
  }
}

function selectRows(state, {payload}, fullState) {
  const {type} = state[payload].attributes.entity
  const {rows, latestSelected} = fullState[type]
  const {isSelected} = state[latestSelected].meta
  const targetPosition = rows.indexOf(payload)
  const startPosition = rows.indexOf(latestSelected)

  if (targetPosition === -1 || startPosition === -1) {
    return state
  }

  if (startPosition <= targetPosition) {
    return selectRange(state, rows.slice(startPosition, targetPosition + 1), isSelected)
  }

  return selectRange(state, rows.slice(targetPosition, startPosition), isSelected)
}

function selectRange(state, ids, value) {
  return ids.reduce((result, id) => ({
    ...result, [id]: {
      ...result[id], meta: {
        ...result[id].meta,
        isSelected: value
      }
    }
  }), state)
}

function fetchTable(state, {status, payload}, {nextId}) {
  if (status === SUCCESS) {
    return loadRows(state, payload, nextId)
  }
  return state
}

function fetchDelta(state, {status, payload}, fullState) {
  if (status === SUCCESS) {
    const {target, response} = payload
    const {idsMap} = fullState[target]
    return loadDeltas(state, idsMap, response.data, target)
  }
  return state
}

function toggleRow(state, {payload}) {
  return immutable.update(state, [
    payload, 'meta', 'isSelected'
  ], toggleFlag)
}

function loadDeltas(prevRows, idsMap, newRows, target) {
  return newRows.reduce((result, row) => {
    const entityId = getEntityId(row, target)
    const rowId = idsMap[entityId]
    if (typeof rowId !== 'undefined') {
      return {
        ...result,
        [rowId]: loadDeltaMetrics(prevRows[rowId], row)
      }
    }
    return result
  }, prevRows)
}

function loadDeltaMetrics(row, deltaRow) {
  const deltaMetrics = prepareMetrics(deltaRow)
  const prevMetrics = row.attributes.metrics
  const newMetrics = Object.getOwnPropertyNames(prevMetrics)
    .reduce((result, prop) => ({
      ...result, [prop]: [
        prevMetrics[prop][0],
        deltaMetrics[prop][0]
      ]
    }), {})
  return immutable.set(row, 'attributes.metrics', newMetrics)
}

function loadRows(prevRows, {target, response}, nextId) {
  return response.data.reduce((result, row, i) => ({
    ...result, [nextId + i]: prepareRow(row, target, nextId + i)
  }), prevRows)
}

function prepareRow(row, target, id) {
  return {
    id, type: 'rows',
    meta: {
      opStatus: 'none',
      isSelected: false,
      isActive: getEntityState(row, target)
    },
    attributes: {
      entity: {
        id: getEntityId(row, target),
        type: target,
        title: getEntityName(row, target)
      },
      metrics: prepareMetrics(row)
    }
  }
}

function toggleAd(state, {status, payload}) {
  const {opStatus, isActive} = state[payload].meta
  switch (status) {
    case SUCCESS:
      return immutable.merge(state, [payload, 'meta'], {
        opStatus: 'done'
      })
    case ERROR:
      return immutable.merge(state, [payload, 'meta'], {
        opStatus: 'error',
        isActive: !isActive
      })
    default:
      return opStatus !== 'updating'
        ? immutable.merge(state, [payload, 'meta'], {
          opStatus: 'updating',
          isActive: !isActive
        }) : state
  }
}

function getEntityState(row, target) {
  if (target === 'ads') {
    return row.state === 'ON'
  }
  return null
}

function prepareMetrics(row) {
  return Object.getOwnPropertyNames(row)
    .filter(prop => !isNotMetric[prop])
    .reduce((result, prop) => ({
      ...result,
      [prop]: [Math.round(row[prop])]
    }), {})
}

export function getEntityId(row, target) {
  return row[idName[target]]
}

function getEntityName(row, target) {
  switch (target) {
    case 'ads':
      return row.ad_name[0] || 'None'
    case 'regions':
      return row.region_name
    case 'offers':
      return row.offer_name
    default:
      return withoutMinusWords(row.name)
  }
}

function withoutMinusWords(name) {
  if (typeof name === 'string') {
    return name.split(' -')[0]
  }
  return 'None'
}

function toggleFlag(value) {
  return !value
}

export default rowsReducer

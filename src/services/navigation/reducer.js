import immutable from 'object-path-immutable'

import {normalizeTrafficSources} from './entities'
import {normalizePlatforms} from './entities'
import {normalizeProjects} from './entities'

import * as actions from './actions'

export const initialState = {
  trafficSources: makeDomainInitialState(),
  platforms: makeDomainInitialState(),
  projects: makeDomainInitialState()
}

const fetchTrafficSources = fetchData('trafficSources', normalizeTrafficSources)
const fetchPlatforms = fetchData('platforms', normalizePlatforms)
const fetchProjects = fetchData('projects', normalizeProjects)

function navigationReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_TRAFFIC_SOURCES:
      return fetchTrafficSources(state, action)
    case actions.FETCH_PLATFORMS:
      return fetchPlatforms(state, action)
    case actions.FETCH_PROJECTS:
      return fetchProjects(state, action)
    case actions.SELECT_TRAFFIC_SOURCE:
      return selectItem(state, 'trafficSources', action.payload.id)
    case actions.SELECT_PLATFORM:
      return selectItem(state, 'platforms', action.payload.id)
    case actions.SELECT_PROJECT:
      return selectItem(state, 'projects', action.payload.id)
    default:
      return state
  }
}

function fetchData(path, normalizer) {
  return function applyNormalizedData(state, {status, payload}) {
    const patch = normalizer(status, payload)
    return immutable.merge(state, path, patch)
  }
}

const resetPatch = {
  trafficSources: makeResetPatch(['platforms', 'projects']),
  platforms: makeResetPatch(['projects']),
  projects: {}
}

function selectItem(state, path, id) {
  return immutable.merge(state, [], {
    ...resetPatch[path],
    [path]: {selected: id}
  })
}

function makeResetPatch(entities) {
  const patch = {ids: null, selected: null}
  return entities.reduce((r, e) => ({...r, [e]: patch}), {})
}

function makeDomainInitialState() {
  return {
    data: {},
    ids: null,
    selected: null
  }
}

export default navigationReducer

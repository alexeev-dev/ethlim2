import {catchError, withLatestFrom} from 'rxjs/operators'
import {map, filter, mergeMap} from 'rxjs/operators'
import {of} from 'rxjs'
import {getAuthToken, getNavPosition} from 'services/app/selectors'
import {SUCCESS, ERROR} from 'services/utils/actions'
import * as actions from './actions'
import * as api from './api'

export function fetchNavigationEpic(action$, state$) {
  return action$.pipe(
    filter(isFetchAction),
    withLatestFrom(state$, prepareQuery),
    mergeMap(query => api[query.type](query.params, query.token).pipe(
      map(response => handleResponse(query.action, response)),
      catchError(error => of(handleError(query.action, error)))
    ))
  )
}

function isFetchAction({type, status}) {
  return (
    type === actions.FETCH_TRAFFIC_SOURCES ||
    type === actions.FETCH_PLATFORMS ||
    type === actions.FETCH_PROJECTS
  ) && status === undefined
}

function prepareQuery(action, state) {
  const token = getAuthToken(state)
  const nav = getNavPosition(state)
  switch (action.type) {
    case actions.FETCH_TRAFFIC_SOURCES:
      return {token, action, type: 'getTrafficSources'}
    case actions.FETCH_PLATFORMS:
      return {
        type: 'getPlatforms',
        token, action,
        params: {
          traffic_source_id: nav.trafficSource
        }
      }
    case actions.FETCH_PROJECTS:
      return {
        type: 'getProjects',
        token, action,
        params: {
          platform_id: nav.platform,
          category_id: 1
        }
      }
    default:
      return {}
  }
}

function handleResponse(action, response) {
  switch (action.type) {
    case actions.FETCH_TRAFFIC_SOURCES:
      return actions.fetchTrafficSources(SUCCESS, response)
    case actions.FETCH_PLATFORMS:
      return actions.fetchPlatforms(SUCCESS, response)
    case actions.FETCH_PROJECTS:
      return actions.fetchProjects(SUCCESS, response)
    default:
      return {}
  }
}

function handleError(action, error) {
  switch (action.type) {
    case actions.FETCH_TRAFFIC_SOURCES:
      return actions.fetchTrafficSources(ERROR, 500)
    case actions.FETCH_PLATFORMS:
      return actions.fetchPlatforms(ERROR, 500)
    case actions.FETCH_PROJECTS:
      return actions.fetchProjects(ERROR, 500)
    default:
      return {}
  }
}

export function selectNavigationEpic(action$, state$) {
  return action$.pipe(
    filter(isFetchSelectAction),
    map(makeFetchAction)
  )
}

function isFetchSelectAction({type}) {
  return (
    type === actions.SELECT_TRAFFIC_SOURCE ||
    type === actions.SELECT_PLATFORM
  )
}

function makeFetchAction(action) {
  switch (action.type) {
    case actions.SELECT_TRAFFIC_SOURCE:
      return actions.fetchPlatforms()
    case actions.SELECT_PLATFORM:
      return actions.fetchProjects()
    default:
      return {}
  }
}

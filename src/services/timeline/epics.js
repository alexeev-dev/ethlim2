import {SUCCESS, ERROR} from 'services/utils/actions'
import {SELECT_PROJECT} from 'services/navigation/actions'
import * as app from 'services/app/selectors'
import {filter, map, withLatestFrom, mergeMap, catchError} from 'rxjs/operators'
import {takeUntil} from 'rxjs/operators'
import {encodeDate} from 'services/utils/date'
import {of} from 'rxjs'
import * as actions from './actions'
import * as api from './api'

export function fetchTimelineEpic(action$, state$) {
  return action$.pipe(
    filter(isFetchTimelineTrigger),
    withLatestFrom(state$, prepareTimelineFetch),
    filter(withoutNull),
    mergeMap(data => api.fetchTimeline(data.query, data.token).pipe(
      map(response => actions.fetchTimeline(SUCCESS, response)),
      catchError(error => of(actions.fetchTimeline(ERROR, error))),
      takeUntil(action$.pipe(
        filter(isFetchTimelineTrigger)
      ))
    ))
  )
}

function isFetchTimelineTrigger({type, status, payload}) {
  return (
    (type === actions.FETCH && status === undefined) ||
    (type === actions.CHANGE_FILTER) || (
      type === SELECT_PROJECT &&
      payload.location === '/timeline'
    )
  )
}

function prepareTimelineFetch(action, state) {
  const nav = app.getNavPosition(state)
  const date = app.getTimelineFilter(state, 'date')
  const logsType = app.getTimelineFilter(state, 'type')
  const token = app.getAuthToken(state)
  const currentPage = app.getTimelinePage(state)
  const total = app.getTimelineTotal(state)
  const page = action.type === actions.FETCH && action.status === undefined
    ? typeof action.payload !== 'undefined'
      ? action.payload
      : currentPage + 1
    : 1
  if (
    page > total ||
    nav.trafficSource === null ||
    nav.platform === null ||
    nav.project === null
  ) {
    return null
  }
  return {
    token,
    query: {
      traffic_source_id: nav.trafficSource,
      platform_id: nav.platform,
      project_id: nav.project,
      date_from: encodeDate(date.from),
      date_to: encodeDate(date.to),
      types: logsType, page,
      limit: 100
    }
  }
}

function withoutNull(value) {
  return value !== null
}

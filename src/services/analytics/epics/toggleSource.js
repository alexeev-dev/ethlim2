import {SUCCESS, ERROR} from 'services/utils/actions'
import {map, filter, mergeMap} from 'rxjs/operators'
import {catchError, withLatestFrom} from 'rxjs/operators'
import * as app from 'services/app/selectors'
import {of} from 'rxjs'
import * as api from '../api'
import * as actions from '../actions'

function toggleSourceEpic(action$, state$) {
  return action$.pipe(
    filter(isTrigger),
    withLatestFrom(state$, prepareQuery),
    mergeMap(query => api.toggleSource(query).pipe(
      map(response => actions.toggleSource(SUCCESS, query.target)),
      catchError(error => of(actions.toggleSource(ERROR, query.target)))
    ))
  )
}

function prepareQuery(action, state) {
  const source = app.getSourcesItem(state, action.payload)
  const nav = app.getNavPosition(state)
  return {
    token: app.getAuthToken(state),
    action: source.isExcluded ? 'exclude' : 'include',
    target: source.id,
    params: {
      traffic_source_id: nav.trafficSource,
      platform_id: nav.platform,
      project_id: nav.project,
      source: source.name,
      id: source.campaign
    }
  }
}

function isTrigger({type, status}) {
  return (
    type === actions.TOGGLE_SOURCE &&
    typeof status === 'undefined'
  )
}

export default toggleSourceEpic

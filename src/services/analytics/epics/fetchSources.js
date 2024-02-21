import {catchError, withLatestFrom} from 'rxjs/operators'
import {map, filter, mergeMap} from 'rxjs/operators'
import {of} from 'rxjs'
import {SUCCESS, ERROR} from 'services/utils/actions'
import * as app from 'services/app/selectors'
import * as actions from '../actions'
import * as api from '../api'

function fetchSourcesEpic(action$, state$) {
  return action$.pipe(
    filter(isTrigger),
    withLatestFrom(state$, prepareQuery),
    mergeMap(query => api.fetchSources(query.params, query.token).pipe(
      map(response => actions.fetchSources(SUCCESS, {
        id: query.target,
        campaign: query.campaign,
        response: response.slice(0, 30)
      })),
      catchError(error => of(actions.fetchSources(ERROR, error)))
    ))
  )
}

function prepareQuery(action, state) {
  const row = app.getRowData(state, action.payload.target)
  const nav = app.getNavPosition(state)
  const campaign = row.attributes.entity.id
  return {
    token: app.getAuthToken(state),
    target: action.payload.target, campaign,
    params: {
      traffic_source_id: nav.trafficSource,
      platform_id: nav.platform,
      project_id: nav.project,
      id: campaign
    }
  }
}

function isTrigger({type, payload}) {
  return (
    type === actions.OPEN_POPUP &&
    payload.type === 'sources'
  )
}

export default fetchSourcesEpic

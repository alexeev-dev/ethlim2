import {map, filter, mergeMap, withLatestFrom} from 'rxjs/operators'
import {SUCCESS} from 'services/utils/actions'
import * as app from 'services/app/selectors'
import * as actions from '../actions'
import * as api from '../api'

function fetchBidsEpic(action$, state$) {
  return action$.pipe(
    filter(isTrigger),
    withLatestFrom(state$, prepareQuery),
    filter(notNull),
    mergeMap(query => api.fetchHistory(query.params, query.token).pipe(
      map(response => actions.fetchBidsHistory(SUCCESS, {
        id: query.target, response
      }))
    ))
  )
}

function prepareQuery({payload}, state) {
  const row = app.getRowData(state, payload.target)
  if (row.meta.isSelected) {
    return null
  }
  const nav = app.getNavPosition(state)
  return {
    token: app.getAuthToken(state),
    target: payload.target,
    params: {
      traffic_source_id: nav.trafficSource,
      platform_id: nav.platform,
      project_id: nav.project,
      id: row.attributes.entity.id
    }
  }
}

function isTrigger({type, payload}) {
  return (
    type === actions.OPEN_POPUP &&
    payload.type === 'bid'
  )
}

function notNull(query) {
  return query !== null
}

export default fetchBidsEpic

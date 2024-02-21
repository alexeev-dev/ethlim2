import {ERROR, SUCCESS} from 'services/utils/actions'
import * as actions from '../actions'
import {map, filter, mergeMap} from 'rxjs/operators'
import {catchError, withLatestFrom} from 'rxjs/operators'
import * as app from 'services/app/selectors'
import * as api from '../api'

function toggleAdEpic(action$, state$) {
  return action$.pipe(
    filter(isTrigger),
    withLatestFrom(state$, prepareQuery),
    mergeMap(query => api.updateAd(query.params, query.token).pipe(
      map(response => actions.toggleAd(SUCCESS, query.rowId)),
      catchError(error => actions.toggleAd(ERROR, query.rowId))
    ))
  )
}

function prepareQuery(action, state) {
  const row = app.getRowData(state, action.payload)
  const nav = app.getNavPosition(state)
  return {
    token: app.getAuthToken(state),
    rowId: action.payload,
    params: {
      traffic_source_id: nav.trafficSource,
      platform_id: nav.platform,
      project_id: nav.project,
      action: row.meta.isActive
        ? 'suspend'
        : 'resume',
      id: row.attributes.entity.id
    }
  }
}

function isTrigger({type, status}) {
  return (
    type === actions.TOGGLE_AD &&
    typeof status === 'undefined'
  )
}

export default toggleAdEpic

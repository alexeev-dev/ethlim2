import {SUCCESS, ERROR} from 'services/utils/actions'
import {map, filter, mergeMap, takeUntil} from 'rxjs/operators'
import {catchError, withLatestFrom} from 'rxjs/operators'
import {of} from 'rxjs'
import {cancelFetching} from './fetchTable'
import * as app from 'services/app/selectors'
import * as actions from '../actions'
import * as api from '../api'

function fetchDeltaEpic(action$, state$) {
  return action$.pipe(
    filter(isTrigger),
    withLatestFrom(state$, prepareQuery),
    mergeMap(query => api.fetchTable(query.params, query.token).pipe(
      map(response => actions.fetchDelta(SUCCESS, {
        target: query.target, response
      })),
      catchError(error => of(actions.fetchDelta(ERROR, {
        error, params: query.params,
        target: query.target
      }))),
      takeUntil(action$.pipe(
        filter(cancelFetching(query))
      ))
    ))
  )
}

function prepareQuery(action, state) {
  const {target, params} = action.payload
  return {
    target, params,
    token: app.getAuthToken(state)
  }
}

function isTrigger({type, status}) {
  return (
    type === actions.FETCH_DELTA &&
    typeof status === 'undefined'
  )
}

export default fetchDeltaEpic

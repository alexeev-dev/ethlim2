import {map, filter, mergeMap, withLatestFrom} from 'rxjs/operators'
import {SUCCESS} from 'services/utils/actions'
import * as app from 'services/app/selectors'
import * as actions from '../actions'
import * as api from '../api'
import {encodeDate} from '../selectors'

const valuesType = {
  regions: 'regions',
  themes: 'themes',
  ads: 'ad_names'
}

function fetchValuesEpic(action$, state$) {
  return action$.pipe(
    filter(isTrigger),
    withLatestFrom(state$, prepareQuery),
    mergeMap(query => api.fetchValues(query.params, query.token).pipe(
      map(response => actions.fetchValues(SUCCESS, {
        filter: query.filter,
        date: query.date,
        response
      }))
    ))
  )
}

function prepareQuery({payload}, state) {
  const date = app.getAnalyticsFilter(state, 'date')
  const nav = app.getNavPosition(state)
  return {
    token: app.getAuthToken(state),
    date, filter: payload,
    params: {
      id: nav.project,
      type: valuesType[payload],
      date_from: encodeDate(date.from),
      date_to: encodeDate(date.to)
    }
  }
}

function isTrigger({type, status}) {
  return (
    type === actions.FETCH_VALUES &&
    typeof status === 'undefined'
  )
}

export default fetchValuesEpic

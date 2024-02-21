import {map, filter, mergeMap, takeUntil} from 'rxjs/operators'
import {catchError, withLatestFrom} from 'rxjs/operators'
import {of, concat} from 'rxjs'
import {SUCCESS, ERROR} from 'services/utils/actions'
import * as app from 'services/app/selectors'
import {getCommonParams, cancelFetching,
  idsParamsNames, prepareResponse} from './fetchTable'
import {getEntityId} from '../reducers/rows'
import {encodeDate} from '../selectors'
import * as actions from '../actions'
import * as api from '../api'

function fetchRowsEpic(action$, state$) {
  return action$.pipe(
    filter(isTrigger),
    withLatestFrom(state$, prepareQuery),
    filter(withoutNullQueries),
    mergeMap(query => api.fetchTable(query.params, query.token).pipe(
      map(prepareResponse(query.params.type)),
      mergeMap(response => (
        response.data.length > 0 ? concat(
          of(actions.fetchRows(SUCCESS, {target: query.params.type, response})),
          api.fetchTable(queryDeltas(query, response), query.token).pipe(
            map(prepareResponse(query.params.type)),
            map(response => actions.fetchDelta(SUCCESS, {
              target: query.params.type, response
            })),
            catchError(error => of(actions.fetchDelta(ERROR, {
              params: queryDeltas(query, response),
              target: query.params.type, error
            })))
          )
        ) : of(
          actions.fetchRows(SUCCESS, {target: query.params.type, response}),
          actions.fetchDelta(SUCCESS, {target: query.params.type, response})
        )
      )),
      catchError(error => of(
        actions.fetchRows(ERROR, {target: query.params.type, error})
      )),
      takeUntil(action$.pipe(
        filter(cancelFetching(query))
      ))
    ))
  )
}

function isTrigger({type, status}) {
  return (
    type === actions.FETCH_ROWS &&
    typeof status === 'undefined'
  )
}

function prepareQuery(action, state) {
  const common = getCommonParams(action, state)
  const date = app.getAnalyticsFilter(state, 'date')
  return {
    token: app.getAuthToken(state),
    params: makeMainParams(common, state, date),
    deltaParams: makeDeltaParams(common, date)
  }
}

function makeMainParams(common, state, date) {
  const special = getSpecialParams(common.type, state)
  return {
    ...common, ...special,
    date_from: encodeDate(date.from),
    date_to: encodeDate(date.to),
    page: app.getNextPage(state, common.type)
  }
}

function makeDeltaParams(common, date) {
  const deltaTime = date.to - date.from
  return {
    ...common,
    date_from: encodeDate(new Date(date.from - deltaTime)),
    date_to: encodeDate(date.from)
  }
}

function withoutNullQueries(query) {
  return query !== null
}

function getSpecialParams(type, state) {
  switch (type) {
    case 'campaigns':
      return {}
    case 'groups':
    case 'regions':
      return {
        campaigns: app.getSelectedCampaignsIds(state)
      }
    case 'ads':
    case 'phrases':
      return chooseParentsList(state)
    default:
      return {}
  }
}

function chooseParentsList(state) {
  const groups = app.getSelectedGroupsIds(state)
  if (groups.length === 0) {
    return {
      campaigns: app.getSelectedCampaignsIds(state)
    }
  }
  return {groups}
}

function queryDeltas(query, response) {
  const {type} = query.params
  const idsParam = idsParamsNames[type]
  return {
    ...query.deltaParams,
    [idsParam]: response.data.map(row => getEntityId(row, type))
  }
}

export default fetchRowsEpic

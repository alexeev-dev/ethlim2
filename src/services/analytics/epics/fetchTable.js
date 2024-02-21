import {map, filter, mergeMap, takeUntil} from 'rxjs/operators'
import {catchError, withLatestFrom} from 'rxjs/operators'
import {of, concat} from 'rxjs'
import {ERROR, SUCCESS} from 'services/utils/actions'
import * as app from 'services/app/selectors'
import {getEntityId} from '../reducers/rows'
import {encodeDate} from '../selectors'
import * as actions from '../actions'
import * as api from '../api'

const fetchTableTriggers = [
  actions.CHANGE_FILTER,
  actions.SELECT_VALUE,
  actions.REMOVE_VALUE,
  actions.RESET_FILTERS,
  actions.RESET,
  actions.FETCH_TABLE,
  actions.TOGGLE_SORTING,
  actions.APPLY_SEARCH
]

function fetchTableEpic(action$, state$) {
  return action$.pipe(
    filter(testTriggers(fetchTableTriggers)),
    withLatestFrom(state$, prepareQuery),
    filter(withoutNullQueries),
    mergeMap(query => api.fetchTable(query.params, query.token).pipe(
      map(prepareResponse(query.params.type)),
      mergeMap(response => (
        response.data.length > 0 ? concat(
          of(actions.fetchTable(SUCCESS, {target: query.params.type, response})),
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
          actions.fetchTable(SUCCESS, {target: query.params.type, response}),
          actions.fetchDelta(SUCCESS, {target: query.params.type, response})
        )
      )),
      catchError(error => of(
        actions.fetchTable(ERROR, {target: query.params.type, error})
      )),
      takeUntil(action$.pipe(
        filter(cancelFetching(query))
      ))
    ))
  )
}

export function prepareResponse(type) {
  return (response) => {
    return type === 'offers' ? {
      ...response, data: response.data
        .filter(item => item.offer_id !== null)
    } : response
  }
}

export function cancelFetching(query) {
  return ({type, status, payload}) => (
    type === actions.CHANGE_FILTER ||
    type === actions.SELECT_VALUE ||
    type === actions.REMOVE_VALUE ||
    type === actions.RESET_FILTERS ||
    type === actions.RESET ||
    (
      type === actions.FETCH_TABLE &&
      typeof status === 'undefined' &&
      payload === query.params.type
    ) ||
    type === actions.TOGGLE_SORTING ||
    type === actions.APPLY_SEARCH
  )
}

function testTriggers(triggers) {
  return action => triggers.some(trigger => action.type === trigger)
}

function prepareQuery(action, state) {
  if (typeof action.status !== 'undefined') {
    return null
  }
  const common = getCommonParams(action, state)
  const date = app.getAnalyticsFilter(state, 'date')
  return {
    token: app.getAuthToken(state),
    params: makeMainParams(common, state, date),
    deltaParams: makeDeltaParams(common, date)
  }
}

export function getCommonParams(action, state) {
  const filtersQuery = app.getFiltersQuery(state)
  const sorting = app.getTableSorting(state)
  const nav = app.getNavPosition(state)
  const type = detectQueryType(action, state)
  const search = app.getSearchQuery(state, type)
  return {
    ...filtersQuery, ...search, type,
    traffic_source_id: nav.trafficSource,
    platform_id: nav.platform,
    project_id: nav.project,
    sortBy: sorting.target,
    sortOrder: sorting.isAscending ? 'ASC' : 'DESC',
    limit: 35
  }
}

function makeMainParams(common, state, date) {
  const special = getSpecialParams(common.type, state)
  return {
    ...common, ...special,
    date_from: encodeDate(date.from),
    date_to: encodeDate(date.to)
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

function detectQueryType(action, state) {
  switch (action.type) {
    case actions.RESET:
      return 'campaigns'
    case actions.CHANGE_FILTER:
    case actions.TOGGLE_SORTING:
    case actions.APPLY_SEARCH:
    case actions.SELECT_VALUE:
    case actions.REMOVE_VALUE:
    case actions.RESET_FILTERS:
      return app.getCurrentTab(state)
    case actions.FETCH_ROWS:
      return typeof action.payload !== 'undefined'
        ? action.payload
        : app.getCurrentTab(state)
    case actions.FETCH_TABLE:
      return action.payload
    default:
      return 'campaigns'
  }
}

function getSpecialParams(type, state) {
  switch (type) {
    case 'campaigns':
      return {}
    case 'groups':
    case 'regions':
    case 'offers':
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

export const idsParamsNames = {
  campaigns: 'campaigns',
  groups: 'ad_groups',
  ads: 'ads',
  phrases: 'phrases',
  regions: 'regions',
  offers: 'offers'
}

function queryDeltas(query, response) {
  const {type} = query.params
  const idsParam = idsParamsNames[type]
  return {
    ...query.deltaParams,
    [idsParam]: response.data.map(row => getEntityId(row, type))
  }
}

export default fetchTableEpic

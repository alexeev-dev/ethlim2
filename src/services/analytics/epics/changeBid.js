import {SUCCESS, ERROR} from 'services/utils/actions'
import {catchError, withLatestFrom} from 'rxjs/operators'
import {map, filter, mergeMap} from 'rxjs/operators'
import {of} from 'rxjs'
import * as app from 'services/app/selectors'
import * as actions from '../actions'
import * as api from '../api'

function changeBidEpic(action$, state$) {
  return action$.pipe(
    filter(isTrigger),
    withLatestFrom(state$, prepareQuery),
    mergeMap(query => api.changeBid(query).pipe(
      map(response => actions.changeBid(SUCCESS, {
        response, popupId: query.popupId
      })),
      catchError(error => of(actions.changeBid(ERROR, {
        error, popupId: query.popupId
      })))
    ))
  )
}

function isTrigger({type, status}) {
  return (
    type === actions.CHANGE_BID &&
    typeof status === 'undefined'
  )
}

function prepareQuery(action, state) {
  const {message, newBid, phraseId, popupId} = action.payload
  const params = getChangeBidTarget(state, phraseId)
  const nav = app.getNavPosition(state)
  return {
    token: app.getAuthToken(state),
    popupId, phraseId,
    params: {
      traffic_source_id: nav.trafficSource,
      platform_id: nav.platform,
      project_id: nav.project,
      new_bid: Math.round(newBid * 1000000),
      message, ...params
    }
  }
}

function getChangeBidTarget(state, phraseId) {
  const isMultiple = phraseId === 'phrases'
  return isMultiple ? {
    phrases: app.getSelectedPhrasesIds(state)
  } : {
    id: app.getRowData(state, phraseId).attributes.entity.id
  }
}

export default changeBidEpic

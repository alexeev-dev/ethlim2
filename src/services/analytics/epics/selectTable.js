import {map, filter, withLatestFrom} from 'rxjs/operators'
import * as app from 'services/app/selectors'
import * as actions from '../actions'
import {OUTDATED} from '../reducers/table'

function selectTableEpic(action$, state$) {
  return action$.pipe(
    filter(isTrigger),
    withLatestFrom(state$, testFakeSwitch),
    filter(action => action),
    map(action => actions.fetchTable(action.payload))
  )
}

function testFakeSwitch(action, state) {
  const status = app.getTableStatus(state, action.payload)
  if (status !== OUTDATED) {
    return false
  }
  return action
}

function isTrigger(action) {
  return action.type === actions.SELECT_TABLE
}

export default selectTableEpic

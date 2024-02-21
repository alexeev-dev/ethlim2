import {tap, map, filter, mergeMap, catchError, ignoreElements} from 'rxjs/operators'
import {of} from 'rxjs'
import {login, LOGIN, LOGOUT} from './actions'
import {SUCCESS, ERROR} from '../utils/actions'
import * as api from './api'

function isAuthTrigger({type, status}) {
  return type === LOGIN && status === undefined
}

function handleResponse(response, action) {
  if (action.payload.remember) {
    localStorage.setItem('api-auth-token', response.token || null)
  }
  return login(SUCCESS, response.token || null)
}

export function logoutEpic(action$) {
  return action$.pipe(
    filter(({type}) => type === LOGOUT),
    tap(() => localStorage.setItem('api-auth-token', null)),
    ignoreElements()
  )
}

export function authEpic(action$) {
  return action$.pipe(
    filter(isAuthTrigger),
    mergeMap(action => api.login(action.payload).pipe(
      map(response => handleResponse(response, action)),
      catchError(error => of(login(ERROR)))
    ))
  )
}

import reducer, {initialState} from '../reducer'
import immutable from 'object-path-immutable'
import {login, logout} from '../actions'
import {SUCCESS} from '../../utils/actions'

describe('authReducer(state, action)', () => {
  test('Возвращает initialState', () => {
    const actual = reducer(undefined, {})
    expect(actual).toBe(initialState)
  })

  test('Игнорирует login без статуса', () => {
    const actual = reducer(initialState, login('admin', '12345678'))
    expect(actual).toBe(initialState)
  })

  test('Применяет login со статусом SUCCESS', () => {
    const actual = reducer(initialState, login(SUCCESS, 'auth_token'))
    expect(actual).toHaveProperty('token', 'auth_token')
  })

  test('Применяет logout', () => {
    const state = immutable.set(initialState, 'token', 'some_token')
    const actual = reducer(state, logout())
    expect(actual).toHaveProperty('token', null)
  })
})

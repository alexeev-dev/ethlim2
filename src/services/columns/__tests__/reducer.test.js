import reducer, {initialState} from '../reducer'
import {changeOrder, toggleColumn} from '../actions'

describe('columnsReducer(state, action)', () => {
  test('Возвращает initialState', () => {
    const actual = reducer(undefined, {})
    expect(actual).toBe(initialState)
  })

  test('Изменяет порядок колонок', () => {
    const action = changeOrder(['a', 'b', 'c'])
    const actual = reducer(initialState, action)
    expect(actual).toHaveProperty('order', ['a', 'b', 'c'])
  })

  test('Тогглит колонки', () => {
    const actionEvents = toggleColumn('events')
    const actionROI = toggleColumn('ROI')
    const actualROI = reducer(initialState, actionROI)
    const actualEvents = reducer(initialState, actionEvents)
    expect(actualROI).toHaveProperty('status.ROI', false)
    expect(actualEvents).toHaveProperty('status.events', true)
  })
})

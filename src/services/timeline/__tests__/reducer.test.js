import reducer, {initialState} from '../reducer'
import {fetchTimeline} from '../actions'

describe('Timeline reducer', () => {
  const response = [
    '2020-01-05T01:57:40.753894Z',
    '2020-01-05T02:57:40.753894Z',
    '2020-01-07T05:57:40.753894Z',
    '2020-01-07T06:57:40.753894Z',
    '2020-01-07T07:57:40.753894Z'
  ].map(makeItem)

  test('Возвращает initialState', () => {
    const actual = reducer(undefined, {})
    expect(actual).toEqual(initialState)
  })

  test('Загружает данные с сервера', () => {
    const actual = reducer(initialState, fetchTimeline(response))
    expect(actual).toHaveProperty('items', [
      {
        date: '2020-01-07',
        items: [
          '2020-01-07T07:57:40.753894Z',
          '2020-01-07T06:57:40.753894Z',
          '2020-01-07T05:57:40.753894Z'
        ].map(makeItem)
      },
      {
        date: '2020-01-05',
        items: [
          '2020-01-05T02:57:40.753894Z',
          '2020-01-05T01:57:40.753894Z'
        ].map(makeItem)
      }
    ])
  })

  function makeItem(created) {
    return {created}
  }
})

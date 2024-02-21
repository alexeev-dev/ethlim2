import {FETCH, fetchTimeline} from '../actions'

test('fetchTimeline() создаёт экшен', () => {
  const action = fetchTimeline(1000)
  expect(action).toEqual({type: FETCH, payload: 1000})
})

import {getResponse, getNormalizedResponse} from '../__fixtures__/responses'
import {makeNavState} from '../__fixtures__/state'
import {fetching} from '../__fixtures__/responses'
import {SUCCESS, ERROR} from '../../utils/actions'
import navigationReducer from '../reducer'
import {initialState} from '../reducer'
import * as actions from '../actions'
import immutable from 'object-path-immutable'

describe('navigationReducer(state, action)', () => {
  test('Возвращает initialState', () => {
    const actual = navigationReducer(undefined, {})
    expect(actual).toEqual(initialState)
  })

  test.each(prepareFetchTestCases(
    'trafficSources',
    actions.fetchTrafficSources
  ))('FETCH_TRAFFIC_SOURCES: %s', testReducer)

  test.each(prepareFetchTestCases(
    'platforms',
    actions.fetchPlatforms
  ))('FETCH_PLATFORMS: %s', testReducer)

  test.each(prepareFetchTestCases(
    'projects',
    actions.fetchProjects
  ))('FETCH_PROJECTS: %s', testReducer)

  const entitiesOrder = [
    'trafficSources',
    'platforms',
    'projects'
  ]

  test.each([
    ['SELECT_TRAFFIC_SOURCE', 0, actions.selectTrafficSource],
    ['SELECT_PLATFORM', 1, actions.selectPlatform],
    ['SELECT_PROJECT', 2, actions.selectProject]
  ])('%s', (_, order, actionCreator) => {
    const testState = makeNavState(
      ['ids', order !== 0],
      ['ids', order !== 1],
      ['ids', order !== 2]
    )
    const actual = navigationReducer(testState, actionCreator('1'))
    const patch = entitiesOrder.slice(order + 1)
      .reduce((result, path) => ({
        ...result, [path]: {ids: null, selected: null}
      }), {[entitiesOrder[order]]: {selected: '1'}})
    const expected = immutable.merge(testState, [], patch)
    expect(actual).toEqual(expected)
  })
})

function prepareFetchTestCases(entityType, actionCreator) {
  return [
    [
      'обрабатывает триггер',
      initialState,
      actionCreator(),
      immutable.merge(initialState, entityType, fetching)
    ],
    [
      'обрабатывает полный ответ',
      initialState,
      actionCreator(SUCCESS, getResponse(entityType)),
      immutable.merge(initialState, entityType, getNormalizedResponse(entityType))
    ],
    [
      'обрабатывает пустой ответ',
      initialState,
      actionCreator(SUCCESS, getResponse('empty')),
      immutable.merge(initialState, entityType, getNormalizedResponse('empty'))
    ],
    [
      'обрабатывает ошибку',
      initialState,
      actionCreator(ERROR, 500),
      immutable.merge(initialState, entityType, getNormalizedResponse('bad'))
    ]
  ]
}

function testReducer(_, state, action, expectedValue) {
  const actual = navigationReducer(state, action)
  expect(actual).toEqual(expectedValue)
}

import {getTrafficSources} from '../selectors'
import {getNavPosition} from '../selectors'
import {getPlatforms} from '../selectors'
import {getProjects} from '../selectors'
import {getNavStatus} from '../selectors'
import {getSelectedProject} from '../selectors'
import {getSelectedPlatform} from '../selectors'
import {getSelectedTrafficSource} from '../selectors'
import immutable from 'object-path-immutable'
import {makeNavState, makeItemsList} from '../__fixtures__/state'

describe('getNavPosition(state)', () => {
  test.each([
    [[null, false], [null, false], [null, false], [null, null, null]],
    [['ids', false], [null, false], [null, false], [null, null, null]],
    [['ids', true], [null, false], [null, false], ['1', null, null]],
    [['ids', true], ['ids', true], ['ids', false], ['1', '2', null]],
    [['ids', true], ['ids', true], ['ids', true], ['1', '2', '2']]
  ])('Обрабатывает случай %#', (trafficSources, platforms, projects, result) => {
    const testState = makeNavState(trafficSources, platforms, projects)
    const actual = getNavPosition(testState)
    expect(actual).toEqual({
      trafficSource: result[0],
      platform: result[1],
      project: result[2]
    })
  })
})

describe('getTrafficSources(state)', () => {
  // Формат тестовых данных:
  // [trafficSources, platforms, projects, result]
  // Где trafficSources, platforms, projects имеют следующий формат:
  // [idsStatus, selectedStatus]
  //   idsStatus может принимать значения (null | 'fetching' | 'error' | 'ids')
  //   selectedStatus может принимать значения (true | false)
  // Значение же result может быть: (null | 'fetching' | 'error' | items)
  // Где items - это массив из следующих значений:
  //   [itemId, isFetching, isSelected, hasError, errorCode]
  test.each([
    [[null, false], [null, false], [null, false], null],
    [['fetching', false], [null, false], [null, false], 'fetching'],
    [['error', false], [null, false], [null, false], 500],
    [['ids', false], [null, false], [null, false], [
      [1, false, false, false, 0], [2, false, false, false, 0]
    ]],
    [['ids', true], [null, false], [null, false], [
      [1, true, true, false, 0], [2, false, false, false, 0]
    ]],
    [['ids', true], ['fetching', false], [null, false], [
      [1, true, true, false, 0], [2, false, false, false, 0]
    ]],
    [['ids', true], ['error', false], [null, false], [
      [1, false, true, true, 500], [2, false, false, false, 0]
    ]],
    [['ids', true], ['ids', false], [null, false], [
      [1, false, true, false, 0], [2, false, false, false, 0]
    ]],
    [['ids', true], ['ids', true], [null, false], [
      [1, false, true, false, 0], [2, false, false, false, 0]
    ]]
  ])('Обрабатывает случай %#', getItemTest(getTrafficSources, 'trafficSources'))
})

describe('getPlatforms(state)', () => {
  test.each([
    [['ids', true], [null, false], [null, false], null],
    [['ids', true], ['fetching', false], [null, false], 'fetching'],
    [['ids', true], ['error', false], [null, false], 500],
    [['ids', true], ['ids', false], [null, false], [
      [1, false, false, false, 0], [2, false, false, false, 0]
    ]],
    [['ids', true], ['ids', true], [null, false], [
      [1, false, false, false, 0], [2, true, true, false, 0]
    ]],
    [['ids', true], ['ids', true], ['fetching', false], [
      [1, false, false, false, 0], [2, true, true, false, 0]
    ]],
    [['ids', true], ['ids', true], ['error', false], [
      [1, false, false, false, 0], [2, false, true, true, 500]
    ]],
    [['ids', true], ['ids', true], ['ids', false], [
      [1, false, false, false, 0], [2, false, true, false, 0]
    ]],
    [['ids', true], ['ids', true], ['ids', true], [
      [1, false, false, false, 0], [2, false, true, false, 0]
    ]]
  ])('Обрабатывает случай %#', getItemTest(getPlatforms, 'platforms'))
})

describe('getProjects(state)', () => {
  test.each([
    [['ids', true], ['ids', true], [null, false], null],
    [['ids', true], ['ids', true], ['fetching', false], 'fetching'],
    [['ids', true], ['ids', true], ['error', false], 500],
    [['ids', true], ['ids', true], ['ids', false], [
      [1, false, false, false, 0], [2, false, false, false, 0]
    ]],
    [['ids', true], ['ids', true], ['ids', true], [
      [1, false, false, false, 0], [2, false, true, false, 0]
    ]]
  ])('Обрабатывает случай %#', getItemTest(getProjects, 'projects'))
})

describe('getNavStatus(state)', () => {
  test.each([
    [[null, false], [null, false], [null, false], null],
    [['fetching', false], [null, false], [null, false], 'fetching'],
    [['error', false], [null, false], [null, false], 500],
    [['ids', false], [null, false], [null, false], 'ready']
  ])('Обрабатывает случай %#', (trafficSources, platforms, projects, result) => {
    const testState = makeNavState(trafficSources, platforms, projects)
    const actual = getNavStatus(testState)
    expect(actual).toBe(result)
  })
})

describe('getSelectedTrafficSource(state)', () => {
  test('Возвращает null, если источник трафика не выбран', () => {
    const testState = makeNavState(['ids', false], [null, false], [null, false])
    const actual = getSelectedTrafficSource(testState)
    expect(actual).toBe(null)
  })

  test('Возвращает null, если источник трафика не найден', () => {
    const okData = makeNavState(['ids', true], [null, false], [null, false])
    const noData = makeNavState([null, true], [null, false], [null, false])
    const noItem = immutable.set(okData, 'trafficSources.selected', '3')
    const testCase1 = getSelectedTrafficSource(noData)
    const testCase2 = getSelectedTrafficSource(noItem)
    expect(testCase1).toBe(null)
    expect(testCase2).toBe(null)
  })

  test('Возвращает источник, если он найден', () => {
    const testState = makeNavState(['ids', true], [null, false], [null, false])
    const actual = getSelectedTrafficSource(testState)
    expect(actual).toBe(testState.trafficSources.data['1'])
  })
})

describe('getSelectedPlatform(state)', () => {
  test('Возвращает null, если платформа не выбрана', () => {
    const testState = makeNavState(['ids', true], ['ids', false], [null, false])
    const actual = getSelectedPlatform(testState)
    expect(actual).toBe(null)
  })

  test('Возвращает null, если платформа не найдена', () => {
    const okData = makeNavState(['ids', true], ['ids', true], [null, false])
    const noData = makeNavState(['ids', true], [null, true], [null, false])
    const noItem = immutable.set(okData, 'platforms.selected', '3')
    const testCase1 = getSelectedPlatform(noData)
    const testCase2 = getSelectedPlatform(noItem)
    expect(testCase1).toBe(null)
    expect(testCase2).toBe(null)
  })

  test('Возвращает платформу, если она найдена', () => {
    const testState = makeNavState(['ids', true], ['ids', true], [null, false])
    const actual = getSelectedPlatform(testState)
    expect(actual).toBe(testState.platforms.data['2'])
  })
})

describe('getSelectedProject(state)', () => {
  test('Возвращает null, если проект не выбран', () => {
    const testState = makeNavState(['ids', true], ['ids', true], ['ids', false])
    const actual = getSelectedProject(testState)
    expect(actual).toBe(null)
  })

  test('Возвращает null, если проект не найден', () => {
    const okData = makeNavState(['ids', true], ['ids', true], ['ids', true])
    const noData = makeNavState(['ids', true], ['ids', true], [null, true])
    const noItem = immutable.set(okData, 'projects.selected', '3')
    const testCase1 = getSelectedProject(noData)
    const testCase2 = getSelectedProject(noItem)
    expect(testCase1).toBe(null)
    expect(testCase2).toBe(null)
  })

  test('Возвращает проект, если он найден', () => {
    const testState = makeNavState(['ids', true], ['ids', true], ['ids', true])
    const actual = getSelectedProject(testState)
    expect(actual).toBe(testState.projects.data['2'])
  })
})

function getItemTest(selector, entityType) {
  return function doItemTest(trafficSources, platforms, projects, result) {
    const testState = makeNavState(trafficSources, platforms, projects)
    const actual = selector(testState)
    const expectedValue = Array.isArray(result)
      ? makeItemsList(entityType, result)
      : result
    expect(actual).toEqual(expectedValue)
  }
}

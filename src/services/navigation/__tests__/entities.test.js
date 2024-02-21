import {getResponse, getNormalizedResponse} from '../__fixtures__/responses'
import {fetching} from '../__fixtures__/responses'
import {SUCCESS, ERROR} from '../../utils/actions'

import {normalizeTrafficSources} from '../entities'
import {normalizePlatforms} from '../entities'
import {normalizeProjects} from '../entities'

const normalizedEmptyResponse = getNormalizedResponse('empty')
const normalizedBadResponse = getNormalizedResponse('bad')
const emptyResponse = getResponse('empty')

describe('normalizeTrafficSources(status, payload)', () => {
  const normalized = getNormalizedResponse('trafficSources')
  const response = getResponse('trafficSources')
  const tests = prepareTestCases(response, normalized)
  test.each(tests)('%s', verifyNormalizer(normalizeTrafficSources))
})

describe('normalizePlatforms(status, payload)', () => {
  const normalized = getNormalizedResponse('platforms')
  const response = getResponse('platforms')
  const tests = prepareTestCases(response, normalized)
  test.each(tests)('%s', verifyNormalizer(normalizePlatforms))
})

describe('normalizeProject(status, payload)', () => {
  const normalized = getNormalizedResponse('projects')
  const response = getResponse('projects')
  const tests = prepareTestCases(response, normalized)
  test.each(tests)('%s', verifyNormalizer(normalizeProjects))
})

function verifyNormalizer(normalizer) {
  return (_, status, payload, expectedValue) => {
    const actual = normalizer(status, payload)
    expect(actual).toEqual(expectedValue)
  }
}

function prepareTestCases(response, normalized) {
  return [
    ['Нормализует триггер', undefined, undefined, fetching],
    ['Нормализует полный ответ', SUCCESS, response, normalized],
    ['Нормализует пустой ответ', SUCCESS, emptyResponse, normalizedEmptyResponse],
    ['Нормализует ошибки', ERROR, 500, normalizedBadResponse]
  ]
}

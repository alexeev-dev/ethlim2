import {getQuery, postQuery, deleteQuery} from 'services/utils/api'

export const fetchValues = getQuery('analytics.values', extractIdAndType)
export const fetchTable = getQuery('analytics.table', extractType)
export const fetchHistory = getQuery('analytics.history', extractId)
export const fetchSources = getQuery('analytics.sources', extractId)
export const updateAd = postQuery('analytics.updateAd', extractId)
const includeSource = postQuery('analytics.includeSource', extractId)
const excludeSource = deleteQuery('analytics.excludeSource', extractId)
const changeBidSingle = postQuery('analytics.changeBidSingle', extractId)
const changeBidMultiple = postQuery('analytics.changeBidMultiple', inQuery)

export function changeBid({token, params, phraseId}) {
  return phraseId === 'phrases'
    ? changeBidMultiple(params, token)
    : changeBidSingle(params, token)
}

export function toggleSource(query) {
  return query.action === 'include'
    ? includeSource(query.params, query.token)
    : excludeSource(query.params, query.token)
}

function inQuery(params) {
  return {
    queryParams: params
  }
}

function extractId({id, ...params}) {
  return {
    routeParams: {id},
    queryParams: params
  }
}

function extractType({type, ...params}) {
  return {
    routeParams: {type},
    queryParams: params
  }
}

function extractIdAndType({id, type, ...params}) {
  return {
    routeParams: {id, type},
    queryParams: params
  }
}

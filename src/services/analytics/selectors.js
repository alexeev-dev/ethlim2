import {multiselect, filtersData} from './data/filters'
import {tabs, tabsTitles} from './data/tabs'
import {createSelector} from 'reselect'
import {END, DONE, OUTDATED} from './reducers/table'

const fMon = v => v < 9 ? '0' + (v + 1) : (v + 1)
const fDay = v => v < 10 ? '0' + v : v

const isRowSelected = data => id => data[id].meta.isSelected
const getRowsIds = type => state => state[type].rows
const getRowsData = state => state.rows
const getEntityId = row => row.attributes.entity.id
const getEntityIds = rows => rows.map(getEntityId)

export const getSelectedCampaigns = getSelectedRows('campaigns')
export const getSelectedPhrases = getSelectedRows('phrases')
export const getSelectedRegions = getSelectedRows('regions')
export const getSelectedGroups = getSelectedRows('groups')
export const getSelectedOffers = getSelectedRows('offers')
export const getSelectedAds = getSelectedRows('ads')
export const getSelectedCampaignsIds = createSelector(getSelectedCampaigns, getEntityIds)
export const getSelectedPhrasesIds = createSelector(getSelectedPhrases, getEntityIds)
export const getSelectedRegionsIds = createSelector(getSelectedRegions, getEntityIds)
export const getSelectedGroupsIds = createSelector(getSelectedGroups, getEntityIds)
export const getSelectedOffersIds = createSelector(getSelectedOffers, getEntityIds)
export const getSelectedAdsIds = createSelector(getSelectedAds, getEntityIds)

function getTablesData({campaigns, phrases, regions, groups, ads, offers}) {
  return {campaigns, phrases, regions, groups, ads, offers}
}

function getSelectedRows(type) {
  return createSelector(
    [getRowsIds(type), getRowsData],
    (ids, data) => ids
      .filter(isRowSelected(data))
      .map(id => data[id])
  )
}

function getSelectedGeneric(state, type) {
  switch (type) {
    case 'campaigns':
      return getSelectedCampaigns(state)
    case 'groups':
      return getSelectedGroups(state)
    case 'phrases':
      return getSelectedPhrases(state)
    case 'regions':
      return getSelectedRegions(state)
    case 'offers':
      return getSelectedOffers(state)
    case 'ads':
      return getSelectedAds(state)
    default:
      return []
  }
}

const getTabsCounters = createSelector(
  [
    getSelectedCampaigns, getSelectedPhrases,
    getSelectedRegions, getSelectedGroups,
    getSelectedAds, getSelectedOffers
  ],
  (campaigns, phrases, regions, groups, ads, offers) => ({
    campaigns: campaigns.length,
    phrases: phrases.length,
    regions: regions.length,
    groups: groups.length,
    ads: ads.length,
    offers: offers.length
  })
)

export function encodeDate(date) {
  const year = date.getFullYear()
  const month = fMon(date.getMonth())
  const day = fDay(date.getDate())
  return `${year}-${month}-${day}`
}

export function getTableRows(state) {
  return state[state.currentTab].rows
}

export function getRowData(state, id) {
  return state.rows[id]
}

export function getCurrentTableStatus(state) {
  return state[state.currentTab].status
}

export function getFilterValue(state, filter) {
  return state.filters[filter]
}

export const getTabsList = createSelector(
  [
    getCurrentTab,
    getTabsCounters,
    getTablesData
  ],
  (current, counters, tables) => {
    const isActive = counters.campaigns > 0
    return tabs.map(tab => ({
      name: tab,
      count: counters[tab],
      title: tabsTitles[tab],
      status: getTabStatus(tables, tab),
      isSelected: tab === current,
      isDisabled: tab !== 'campaigns' && !isActive
    }))
  }
)

function getTabStatus(state, tab) {
  const {status, rowsStatus, deltaStatus} = state[tab]
  if (status !== DONE && status !== END) {
    return {name: status, target: 'table'}
  } else if (rowsStatus !== DONE) {
    return {name: rowsStatus, target: 'rows'}
  } else if (deltaStatus !== DONE) {
    return {name: deltaStatus, target: 'delta'}
  }
  return {name: DONE}
}

export function getCurrentTab(state) {
  return state.currentTab
}

export function getTableStatus(state, table) {
  return state[table].status
}

export function getTableSorting(state) {
  return state.sorting
}

export function getMultiFilters(state) {
  return multiselect.map((filter) => {
    const {all, cluster, search, byId, isOpen} = state.filters[filter]
    const available = all.filter(id => !byId[id].isSelected)
    const filtered = search.length > 0
      ? available.filter(searchValue(search, byId))
      : available
    const {before, after, clusterized} = clusterizeValues(filtered, cluster)
    const values = clusterized.map(id => byId[id])
    return {
      id: filter,
      ...filtersData[filter],
      status: getFilterStatus(state, filter),
      values, before, after,
      cluster, search, isOpen
    }
  })
}

function searchValue(value, byId) {
  return (id) => {
    const {title} = byId[id]
    return title.toLowerCase().includes(value.toLowerCase())
  }
}

function clusterizeValues(values, cluster) {
  const total = values.length
  const before = cluster * 50
  const after = Math.max(0, total - before - 100)
  const clusterized = values.slice(before, before + 100)
  return {before, after, clusterized}
}

function getFilterStatus(state, filter) {
  const {date, status} = state.filters[filter]
  if (status === DONE) {
    return date !== state.filters.date
      ? OUTDATED
      : DONE
  }
  return status
}

export function getFiltersList(state) {
  return multiselect.map((name) => {
    const filter = {name, ...filtersData[name]}
    const values = state.filters[name].byId
    return state.filters[name].all
      .filter(id => values[id].isSelected)
      .map(id => ({filter, value: values[id]}))
  }).reduce((result, items) => result.concat(items), [])
}

const queryFilterName = {
  regions: 'region_id',
  themes: 'theme',
  ads: 'ad_name'
}

export function getFiltersQuery(state) {
  return multiselect.reduce((result, name) => {
    const {all, byId} = state.filters[name]
    const selected = all.filter(id => byId[id].isSelected)
    if (selected.length > 0) {
      return {...result, [queryFilterName[name]]: selected}
    }
    return result
  }, {})
}

export function getNextPage(state, table) {
  return state[table].page + 1
}

export function canLoadRows(state) {
  const currentTab = state.currentTab
  const {status, rowsStatus, deltaStatus} = state[currentTab]
  return status === DONE && rowsStatus === DONE && deltaStatus === DONE
}

export function getAnalyticsPopups(state) {
  return state.popups.ids
}

export function getPopupData(state, id) {
  const popup = state.popups.byId[id]
  switch (popup.type) {
    case 'funnel':
      return getFunnelData(state, popup)
    case 'bid':
      return getBidData(state, popup)
    case 'sources':
      return getSourcesData(state, popup)
    default:
      return popup
  }
}

const entityTitlesMulti = {
  campaigns: 'campaigns',
  groups: 'groups',
  phrases: 'keywords',
  regions: 'regions',
  ads: 'ads',
  offers: 'offers'
}

const entityTitles = {
  campaigns: 'campaign',
  groups: 'group',
  phrases: 'keyword',
  regions: 'region',
  ads: 'ad',
  offers: 'offer'
}

function getFunnelData(state, popup) {
  if (typeof popup.target === 'string') {
    const rows = getSelectedGeneric(state, popup.target)
    const title = getFunnelTitle(popup.target, rows.length)
    const metrics = calcAverageMetrics(rows)
    return {
      ...popup,
      metrics, title,
      selected: rows.length
    }
  }
  const row = state.rows[popup.target]
  const title = getFunnelTitle(1, row)
  const metrics = getFlatMetrics(row.attributes.metrics)
  return {...popup, metrics, title, selected: 0}
}

function getFunnelTitle(target, payload) {
  if (typeof target === 'string') {
    return `Average funnel with (${payload}) selected ${entityTitlesMulti[target]}`
  }
  const {id, type, title} = payload.attributes.entity
  return `Funnel for ${entityTitles[type]} ${id} — ${title}`
}

function getFlatMetrics(metrics) {
  return Object.getOwnPropertyNames(metrics)
    .reduce((result, prop) => ({
      ...result, [prop]: metrics[prop][0]
    }), {})
}

function calcAverageMetrics(rows) {
  if (rows.length > 0) {
    const {metrics} = rows[0].attributes
    return Object.getOwnPropertyNames(metrics)
      .reduce((result, prop) => ({
        ...result, [prop]: calcAverageValue(rows, prop)
      }), {})
  }
  return null
}

function calcAverageValue(rows, prop) {
  const average = rows.reduce((sum, row) => (
    sum + row.attributes.metrics[prop][0]
  ), 0) / rows.length
  return Math.round(average * 100) / 100
}

function getBidData(state, popup) {
  if (typeof popup.target === 'string') {
    const rows = getSelectedGeneric(state, popup.target)
    const title = getBidTitle(popup.target, rows.length)
    const metrics = calcAverageMetrics(rows)
    return {
      ...popup,
      metrics, title,
      history: null,
      selected: rows.length
    }
  }
  const row = state.rows[popup.target]
  const title = getBidTitle(1, row)
  const history = getBidHistory(state, popup.target)
  const metrics = getFlatMetrics(row.attributes.metrics)
  return {...popup, metrics, title, history, selected: 0}
}

function getBidHistory(state, id) {
  return state.bids[id] || null
}

function getBidTitle(target, payload) {
  if (typeof target === 'string') {
    return `Change bids for (${payload}) keywords`
  }
  const {id, title} = payload.attributes.entity
  return `Keyword Bid Change [${id}]: ${title}`
}

export function getSearchType({currentTab, ...state}) {
  return state[currentTab].search.type
}

export function getSearchPhrase({currentTab, ...state}) {
  const {type} = state[currentTab].search
  return state[currentTab].search[type]
}

export function getSearchQuery(state, table) {
  const {type, phrase} = state[table].search.applied
  return phrase.length > 0
    ? type === 'byName'
      ? {search_name: phrase}
      : {search_id: phrase}
    : null
}

export function getCurrentError(state) {
  const {status, rowsStatus, deltaStatus} = state[getCurrentTab(state)]
  if (typeof status !== 'string') {
    return status
  }
  if (typeof deltaStatus !== 'string') {
    return deltaStatus
  }
  if (typeof rowsStatus !== 'string') {
    return rowsStatus
  }
  return false
}

function getSourcesData(state, popup) {
  const row = getRowData(state, popup.target)
  const {entity} = row.attributes
  const title = `Traffic sources [${entity.id}] ${entity.title}`
  const sources = state.sources.lists[popup.target] || {
    id: popup.target,
    status: 'fetching',
    items: []
  }
  return {
    ...popup,
    sources, title,
    history: null,
    selected: 0
  }
}

export function getSourcesItem(state, id) {
  return state.sources.byId[id]
}

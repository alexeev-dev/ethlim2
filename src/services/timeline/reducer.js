import {getToday, getMonthBefore} from 'services/utils/date'
import immutable from 'object-path-immutable'
import * as actions from './actions'
import {SUCCESS, ERROR} from 'services/utils/actions'
import {prepareTimelineItem} from './entities'

export const initialState = {
  items: [],
  page: 1,
  total: 1,
  filters: {
    date: {
      from: getMonthBefore(),
      to: getToday()
    },
    type: 'external_source'
  },
  isPending: false,
  hasError: false
}

function timelineReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH:
      return handleFetch(state, action)
    case actions.CHANGE_FILTER:
      return handleFilterChange(state, action)
    default:
      return state
  }
}

function handleFetch(state, {status, payload}) {
  if (typeof status === 'undefined') {
    return {...state, isPending: true}
  }

  if (status === SUCCESS) {
    const {page, pages: total} = payload
    const items = page > 1
      ? groupByDate(payload, state.items.slice())
      : groupByDate(payload)
    return immutable.merge(state, [], {
      page, items, total,
      isPending: false, hasError: false
    })
  }

  if (status === ERROR) {
    return immutable.merge(state, [], {isPending: false, hasError: true})
  }

  return state
}

function appendItem(list, item) {
  const latest = list[list.length - 1]
  if (latest.type === item.type) {
    if (!groupByType(latest, item)) {
      list.push(item)
    }
  } else {
    list.push(item)
  }
}

function groupByType(latest, current) {
  if (
    latest.type === 'change_bid' &&
    latest.bid_value === current.bid_value &&
    latest.phrase && current.phrase &&
    latest.phrase.ad_group.campaign.ext_id
    === current.phrase.ad_group.campaign.ext_id
  ) {
    if (Array.isArray(latest.phrases)) {
      latest.bid_difference =  (
        latest.bid_difference * latest.phrases.length
        + current.bid_difference
      ) / (latest.phrases.length + 1)
      latest.phrases.push({
        bid_difference: current.bid_difference,
        title: current.breadcrumbs[2]
      })
    } else {
      latest.bid_difference = (
        latest.bid_difference
        + current.bid_difference
      ) / 2
      latest.phrases = [
        {
          bid_difference: latest.bid_difference,
          breadcrumbs: latest.breadcrumbs.slice(1)
        },
        {
          bid_difference: current.bid_difference,
          breadcrumbs: current.breadcrumbs.slice(1)
        }
      ]
      latest.breadcrumbs = latest.breadcrumbs.slice(0, 1)
    }
    return true
  }
  return false
}

function groupByDate(response, prevItems = []) {
  const items = response.data || []
  return items.reduce((result, rawItem) => {
    const latest = result[result.length - 1] || {}
    const item = prepareTimelineItem(rawItem)
    const date = item.created.slice(0, 10)
    if (latest.date === date) {
      appendItem(latest.items, item)
      latest.id = makeItemsGroupId(latest.items.length, date)
    } else {
      result.push({
        id: makeItemsGroupId(1, date),
        date, items: [item]
      })
    }
    return result
  }, prevItems)
}

function makeItemsGroupId(count, date) {
  return `${count}-${date}`
}

function handleFilterChange(state, {payload}) {
  const {name, value} = payload
  return immutable.merge(state, [], {
    hasError: false,
    isPending: true,
    filters: {[name]: value}
  })
}

export default timelineReducer

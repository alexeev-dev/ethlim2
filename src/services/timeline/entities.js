export function prepareTimelineItem(rawItem) {
  switch (rawItem.type) {
    case 'change_bid':
      return makeChangeBidItem(rawItem)
    case 'change_state':
      return makeChangeStateItem(rawItem)
    default:
      return extendItem(rawItem)
  }
}

function makeChangeBidItem(rawItem) {
  const bid_value = Math.round(rawItem.bid_value / 1000) / 1000
  const bid_difference = Math.round(rawItem.bid_difference / 1000) / 1000
  const breadcrumbs = rawItem.phrase ? [
    `[${rawItem.phrase.ad_group.campaign.ext_id}] ${rawItem.phrase.ad_group.campaign.name}`,
    `[${rawItem.phrase.ad_group.ext_id}] ${rawItem.phrase.ad_group.name}`,
    `[${rawItem.phrase.ext_id}] ${rawItem.phrase.name}`
  ].map(withoutMinusWords) : []
  return extendItem(rawItem, {bid_value, bid_difference, breadcrumbs})
}

function makeChangeStateItem(rawItem) {
  const breadcrumbs = rawItem.ad ? [
    `[${rawItem.ad.ad_group.campaign.ext_id}] ${rawItem.ad.ad_group.campaign.name}`,
    `[${rawItem.ad.ad_group.ext_id}] ${rawItem.ad.ad_group.name}`
  ] : []
  return extendItem(rawItem, {breadcrumbs})
}

function withoutMinusWords(name) {
  return name.split(' -')[0]
}

function extendItem(rawItem, extraData = null) {
  const user = rawItem.user || {}
  return {...rawItem, user, ...extraData}
}

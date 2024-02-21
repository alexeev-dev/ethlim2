import * as metrics from '../metrics/selectors'
import immutable from 'object-path-immutable'

import {fixed} from '../utils/numbers'

export function getPopupTitle(state, popup) {
  if (popup.attributes.popupGroup === 'metrics') {
    const metricsId = popup.relationships.metrics.id
    return metrics.getMetricsFullTitle(state.metrics, metricsId)
  }
  return popup.attributes.title || 'Попап'
}

function getSwitcherData(state, popup) {
  const metricsId = popup.relationships.metrics.id
  const source = metrics.getMetricsSource(state.metrics, metricsId)
  if (source.meta && source.meta.error) {
    return {id: source.meta.error, type: 'error'}
  }
  switch (source.type) {
    case 'campaigns':
      return source.relationships.sources || null
    case 'groups':
      return source.relationships.ads || null
    default:
      return null
  }
}

function getFunnelData(state, popup) {
  const metricsId = popup.relationships.metrics.id
  return metrics.getMetrics(state.metrics, metricsId)
}

function getBidData(state, popup) {
  const {id} = popup.relationships.source
  const data = metrics.getMetricsEntity(state.metrics, 'phrases', id)
  if (data.meta && data.meta.error) {
    return {id: data.meta.error, type: 'error'}
  }
  const {attributes} = metrics.getMetrics(state.metrics, data.relationships.metrics)
  const preparedMetrics = {
    CPC: fixed(attributes.CPC),
    CPL: typeof attributes.leads_cost === 'string' ? attributes.leads_cost : fixed(attributes.leads_cost),
    ROI: typeof attributes.ROI === 'string' ? attributes.ROI : fixed(attributes.ROI),
    clicks: attributes.clicks,
    cost: fixed(attributes.cost),
    leads: attributes.leads
  }
  return data.meta
    ? immutable.set(data, 'attributes.metrics', preparedMetrics)
    : null
}

export function getPopupData(state, popup) {
  const {popupType} = popup.attributes
  switch (popupType) {
    case 'switcher':
      return getSwitcherData(state, popup)
    case 'funnel':
      return getFunnelData(state, popup)
    case 'bid':
      return getBidData(state, popup)
    default:
      return null
  }
}

export const getSwitcherRow = (state, id, type) => {
  return metrics.getMetricsEntity(state.metrics, type, id)
}

import immutable from 'object-path-immutable'
import {columnsOrder} from './columns'
import {CHANGE_ORDER, TOGGLE_COLUMN} from './actions'

const initialColumns = [
  'name', 'CPC', 'ROI', 'impres', 'clicks',
  'CTR', 'bounces_prct', 'click_unique',
  'click_unique_prct', 'leads_unique',
  'leads_cost', 'approved_count',
  'rejected_count'
]

export const initialState = {
  status: prepareStatus(columnsOrder, initialColumns),
  order: columnsOrder
}

const toggle = v => !v

function columnsReducer(state = initialState, action) {
  const {type, payload} = action
  switch (type) {
    case CHANGE_ORDER:
      return immutable.set(state, 'order', payload)
    case TOGGLE_COLUMN:
      return immutable.update(state, ['status', payload], toggle)
    default:
      return state
  }
}

function prepareStatus(all, active) {
  return all.reduce((result, id) => (
    {...result, [id]: active.indexOf(id) !== -1}
  ), {})
}

export default columnsReducer

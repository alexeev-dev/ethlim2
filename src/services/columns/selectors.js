import {createSelector} from 'reselect'
import {columns} from './columns'

const onlyActive = status => id => status[id]
const withData = (id) => columns[id]
const getColumnsStatus = state => state.status
const getColumnsOrder = state => state.order

export const getActiveColumns = createSelector(
  [
    getColumnsStatus,
    getColumnsOrder
  ],
  (status, order) => order
    .filter(onlyActive(status))
    .map(withData)
)

export function isAdjustmentColumns(state) {
  const status = getColumnsStatus(state)
  return [status.adjustmentA, status.adjustmentB]
}

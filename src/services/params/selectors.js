import {createSelector} from 'reselect'

export const getAllParams = state => state

export const getAdjustmentParams = createSelector(
  [getAllParams],
  (params) => {
    return {
      clicks: +params.clicks,
      troi: +params.troi,
      tcost: +params.tcost,
      rate: {min: +params.rate.min, max: +params.rate.max},
      adjustmentMax: +params.adjustmentMax
    }
  }
)

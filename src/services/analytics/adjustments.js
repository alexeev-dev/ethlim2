export function calcRoiAdjustment({roi, troi, ...params}) {
  return pipeAdjusment('roi', params)(
    roi > 70
      ? Math.max(roi / troi - 1, 0)
      : 0
  )
}

export function calcLeadAdjustment({roi, cost, tcost, ...params}) {
  return pipeAdjusment('lead', params)(
    roi < 0 && cost > tcost
      ? Math.min(tcost / cost - 1, 0)
      : 0
  )
}

const roundAdjustment = adj => Math.round(adj * 100) / 100
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

function pipeAdjusment(type, {cpc, minCPC, maxCPC, maxAdjustment}) {
  return pipe(
    limitAdjustment(type, maxAdjustment),
    applyCPC(cpc, minCPC, maxCPC),
    roundAdjustment
  )
}

function limitAdjustment(type, maxAdjustment) {
  return (adjustment) => {
    if (maxAdjustment > 0) {
      if (type === 'roi') {
        return Math.abs(adjustment) >= 2
          ? Math.sign(adjustment) * 0.2
          : Math.abs(adjustment) >= 1.5 && Math.abs(adjustment) < 2
            ? Math.sign(adjustment) * 0.15
            : Math.abs(adjustment) >= 1.2 && Math.abs(adjustment) < 1.5
              ? Math.sign(adjustment) * 0.1
              : 0
      }
      return (
        Math.abs(adjustment) > maxAdjustment
          ? Math.sign(adjustment) * maxAdjustment
          : adjustment
      )
    }
    return adjustment
  }
}

function applyCPC(cpc, minCPC, maxCPC) {
  return (adjustment) => {
    const endCPC = cpc + cpc * adjustment
    return endCPC < minCPC
      ? minCPC - cpc
      : endCPC > maxCPC
        ? maxCPC - cpc
        : cpc * adjustment
  }
}

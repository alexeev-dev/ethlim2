export const toFixed = a => n => Math.round(n * Math.pow(10, a)) / Math.pow(10, a)
export const fixed = toFixed(2)

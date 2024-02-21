const fMon = v => v < 9 ? '0' + (v + 1) : (v + 1)
const fDay = v => v < 10 ? '0' + v : v

export function getMonthBefore() {
  const month = new Date()
  month.setMonth(month.getMonth() - 1)
  month.setHours(0, 0, 0, 0)
  return month
}

export function getToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

export function encodeDate(date) {
  const year = date.getFullYear()
  const month = fMon(date.getMonth())
  const day = fDay(date.getDate())
  return `${year}-${month}-${day}`
}

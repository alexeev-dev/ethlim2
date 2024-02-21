export const dateRangeValues = [
  {
    title: 'Today',
    value: () => {
      const today = new Date()
      today.setHours(0,0,0,0)
      return {
        from: today,
        to: today
      }
    }
  },
  {
    title: 'Yesterday',
    value: () => {
      const today = new Date()
      today.setHours(0,0,0,0)
      const currentDay = today.getDate()
      const yesterday = new Date()
      yesterday.setHours(0,0,0,0)
      yesterday.setDate(currentDay - 1)
      return {
        from: yesterday,
        to: yesterday
      }
    }
  },
  {
    title: '1 week',
    value: () => {
      const today = new Date()
      today.setHours(0,0,0,0)
      const currentDay = today.getDate()
      const week = new Date()
      week.setHours(0,0,0,0)
      week.setDate(currentDay - 6)
      return {
        from: week,
        to: today
      }
    }
  },
  {
    title: '1 month',
    value: () => {
      const today = new Date()
      today.setHours(0,0,0,0)
      const currentMonth = today.getMonth()
      const month = new Date()
      month.setHours(0,0,0,0)
      month.setMonth(currentMonth - 1)
      return {
        from: month,
        to: today
      }
    }
  },
  {
    title: '1 quarter',
    value: () => {
      const today = new Date()
      today.setHours(0,0,0,0)
      const currentMonth = today.getMonth()
      const quarter = new Date()
      quarter.setHours(0,0,0,0)
      quarter.setMonth(currentMonth - 3)
      return {
        from: quarter,
        to: today
      }
    }
  },
  {
    title: '1 year',
    value: () => {
      const today = new Date()
      today.setHours(0,0,0,0)
      const currentYear = today.getFullYear()
      const year = new Date()
      year.setHours(0,0,0,0)
      year.setYear(currentYear - 1)
      return {
        from: year,
        to: today
      }
    }
  }
]

export const monthTitles = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

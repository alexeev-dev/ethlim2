export const groups = {
  impresGroup: {
    title: 'Impressions',
    columns: [
      'impres',
      'impres_cost'
    ]
  },
  transitionsGroup: {
    title: 'Visits',
    columns: [
      'clicks',
      'CTR',
      'CPC'
    ]
  },
  bouncesGroup: {
    title: 'Bounce',
    columns: [
      'bounces',
      'bounces_prct'
    ]
  },
  eventsGroup: {
    title: 'Events',
    columns: [
      'events'
    ]
  },
  eventsUserGroup: {
    title: 'Events for 1 user',
    columns: [
      'events_per_user'
    ]
  },
  changeFilterGroup: {
    title: '::user-click:: by filters',
    columns: [
      'change_filter'
    ]
  },
  changeDirectionGroup: {
    title: '::user-click:: by category',
    columns: [
      'change_direction'
    ]
  },
  offerDetailsGroup: {
    title: '::user-click:: by -more- button',
    columns: [
      'offer_details'
    ]
  },
  pendingGroup: {
    title: 'Pending',
    columns: [
      'pending_count',
      'pending_sum'
    ]
  },
  approvedGroup: {
    title: 'Sale',
    columns: [
      'approved_count',
      'approved_sum',
      'approved_cost',
      'approved_unique'
    ]
  },
  rejectedGroup: {
    title: 'Rejected',
    columns: [
      'rejected_count',
      'rejected_sum'
    ]
  },
  costGroup: {
    title: 'Total costs',
    columns: [
      'cost'
    ]
  },
  enterGroup: {
    title: 'enter_landing',
    columns: [
      'enter_landing'
    ]
  },
  roiGroup: {
    title: 'ROI',
    columns: [
      'ROI'
    ]
  },
  ageGroup: {
    title: 'Age',
    columns: [
      'age'
    ]
  },
  correctionGroup: {
    title: 'Algorithms',
    columns: [
      'adjustmentA',
      'adjustmentB'
    ]
  },
  usersGroup: {
    title: 'Users',
    columns: [
      'users'
    ]
  },
  clickUniqueGroup: {
    title: '::eye:: conversion',
    columns: [
      'click_unique',
      'click_unique_prct',
      'click_unique_cost'
    ]
  },
  leadsUniqueGroup: {
    title: '::eye:: leads',
    columns: [
      'leads_unique',
      'leads_prct',
      'leads_count_per_click_unique',
      'leads_cost'
    ]
  }
}

export const columnGroups = [
  'impresGroup',
  'transitionsGroup',
  'bouncesGroup',
  'eventsGroup',
  'enterGroup',
  'eventsUserGroup',
  'changeFilterGroup',
  'changeDirectionGroup',
  'offerDetailsGroup',
  'clickUniqueGroup',
  'leadsUniqueGroup',
  'pendingGroup',
  'approvedGroup',
  'rejectedGroup',
  'costGroup',
  'roiGroup',
  'correctionGroup'
]

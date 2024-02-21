export const columns = {
  'name': {
    id: 'name',
    type: 'columns',
    attributes: {
      title: 'Name [Id]',
      titleShort: '',
      cell: ['headerName', 'name']
    }
  },
  'CPC': {
    id: 'CPC',
    type: 'columns',
    attributes: {
      title: 'CPC',
      titleShort: 'CPC',
      cell: ['headerData', 'data'],
      dimension: 'rub',
      tooltip: 'CPC : calculate ourselves',
    }
  },
  'CTR': {
    id: 'CTR',
    type: 'columns',
    attributes: {
      title: 'CTR',
      titleShort: 'CTR',
      cell: ['headerData', 'data'],
      dimension: '',
      tooltip: 'CTR : calculate ourselves',
    }
  },
  'ROI': {
    id: 'ROI',
    type: 'columns',
    attributes: {
      title: 'ROI',
      titleShort: '%',
      cell: ['headerData', 'data'],
      dimension: '%',
      tooltip: 'ROI : calculate ourselves',
    }
  },
  'age': {
    id: 'age',
    type: 'columns',
    attributes: {
      title: 'Age',
      titleShort: 'years old',
      cell: ['headerData', 'data'],
      dimension: 'years old',
      tooltip: 'Age',
    }
  },
  'approved_unique': {
    id: 'approved_unique',
    type: 'columns',
    attributes: {
      title: 'Sales. ::eye::',
      titleShort: '::eye::',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'how many approved UNIQUE',
    }
  },
  'approved_count': {
    id: 'approved_count',
    type: 'columns',
    attributes: {
      title: 'Sale',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'how many approved',
    }
  },
  'approved_leads_prct': {
    id: 'approved_leads_prct',
    type: 'columns',
    attributes: {
      title: 'Approved % of lead',
      titleShort: '% of lead',
      cell: ['headerData', 'data'],
      dimension: '%',
      tooltip: 'been transformed from lead to approved',
    }
  },
  'approved_sum': {
    id: 'approved_sum',
    type: 'columns',
    attributes: {
      title: 'Revenue',
      titleShort: 'revenue',
      cell: ['headerData', 'data'],
      dimension: 'rub',
      tooltip: 'total revenue : approved',
    }
  },
  'approved_cost': {
    id: 'approved_cost',
    type: 'columns',
    attributes: {
      title: 'Selling price',
      titleShort: 'price',
      cell: ['headerData', 'data'],
      dimension: 'rub',
      tooltip: 'how much costs 1 approve (NOT UNIQUE)',
    }
  },
  'bounces': {
    id: 'bounces',
    type: 'columns',
    attributes: {
      title: 'Bounces',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'bounce rate : receive from Yandex',
    }
  },
  'bounces_prct': {
    id: 'bounces_prct',
    type: 'columns',
    attributes: {
      title: '% of bounces',
      titleShort: '%',
      cell: ['headerData', 'data'],
      dimension: '%',
      tooltip: 'bounce rate : calculate ourselves',
    }
  },
  'change_direction': {
    id: 'change_direction',
    type: 'columns',
    attributes: {
      title: '::user-click:: by category',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'how many clicks by categories',
    }
  },
  'change_filter': {
    id: 'change_filter',
    type: 'columns',
    attributes: {
      title: '::user-click:: by filters',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'how many clicks by filters',
    }
  },
  'click_offer': {
    id: 'click_offer',
    type: 'columns',
    attributes: {
      title: 'Conversion',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'how many clicks by сonversion button',
    }
  },
  'click_unique': {
    id: 'click_unique',
    type: 'columns',
    attributes: {
      title: '::eye:: Conversion',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'how many clicks by сonversion button (UNIQUE)',
    }
  },
  'click_unique_cost': {
    id: 'click_unique_cost',
    type: 'columns',
    attributes: {
      title: 'Conversion Price',
      titleShort: 'price',
      cell: ['headerData', 'data'],
      dimension: 'rub',
      tooltip: 'how much costs 1 click by сonversion button',
    }
  },
  'click_unique_prct': {
    id: 'click_unique_prct',
    type: 'columns',
    attributes: {
      title: '% of conversions',
      titleShort: '%',
      cell: ['headerData', 'data'],
      dimension: '%',
      tooltip: 'how many % of users been clicked by сonversion button',
    }
  },
  'clicks': {
    id: 'clicks',
    type: 'columns',
    attributes: {
      title: 'Clicks',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'total clicks : receive from Yandex',
    }
  },
  'cost': {
    id: 'cost',
    type: 'columns',
    attributes: {
      title: 'Total costs',
      titleShort: 'rub',
      cell: ['headerData', 'data'],
      dimension: 'rub',
      tooltip: 'how much been spent for ads clicks : receive from Yandex',
    }
  },
  'enter_landing': {
    id: 'enter_landing',
    type: 'columns',
    attributes: {
      title: 'enter_landing',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'how many visits been recorded',
    }
  },
  'events': {
    id: 'events',
    type: 'columns',
    attributes: {
      title: 'Events',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'how many events been recorded',
    }
  },
  'events_per_user': {
    id: 'events_per_user',
    type: 'columns',
    attributes: {
      title: 'Events for 1 user',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'how many events for 1 user',
    }
  },
  'impres': {
    id: 'impres',
    type: 'columns',
    attributes: {
      title: 'Impressions',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'how many impressions were in Yandex : receive from Yandex',
    }
  },
  'impres_cost': {
    id: 'impres_cost',
    type: 'columns',
    attributes: {
      title: 'Impression price',
      titleShort: 'price',
      cell: ['headerData', 'data'],
      dimension: 'rub',
      tooltip: 'how much costs 1 mpression : calculate ourselves',
    }
  },
  'leads': {
    id: 'leads',
    type: 'columns',
    attributes: {
      title: '::eye:: Lead',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'total leads (NOT UNIQUE)',
    }
  },
  'leads_cost': {
    id: 'leads_cost',
    type: 'columns',
    attributes: {
      title: 'Lead price',
      titleShort: 'price',
      cell: ['headerData', 'data'],
      dimension: 'rub',
      tooltip: 'how much costs 1 lead (UNIQUE)',
    }
  },
  'leads_count_per_click_unique': {
    id: 'leads_count_per_click_unique',
    type: 'columns',
    attributes: {
      title: 'Average leads',
      titleShort: 'average',
      cell: ['headerData', 'data'],
      dimension: '%',
      tooltip: '= leads / click_unique : % of total leads from UNIQUE visits',
    }
  },
  'leads_prct': {
    id: 'leads_prct',
    type: 'columns',
    attributes: {
      title: 'Lead % from ::eye:: ::user::',
      titleShort: '% from ::eye:: ::user::',
      cell: ['headerData', 'data'],
      dimension: '%',
      tooltip: '= leads_unique / users : % of UNIQUE leads from UNIQUE visits',
    }
  },
  'leads_unique': {
    id: 'leads_unique',
    type: 'columns',
    attributes: {
      title: '::eye:: Lead',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'total leads (UNIQUE)',
    }
  },
  'offer_details': {
    id: 'offer_details',
    type: 'columns',
    attributes: {
      title: '::user-click:: more',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'total click by -more- button',
    }
  },
  'pending_count': {
    id: 'pending_count',
    type: 'columns',
    attributes: {
      title: 'Pending',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'how many Pendings',
    }
  },
  'pending_leads_prct': {
    id: 'pending_leads_prct',
    type: 'columns',
    attributes: {
      title: 'Pending % from Lead',
      titleShort: '% from Lead',
      cell: ['headerData', 'data'],
      dimension: '%',
      tooltip: '= pending_count / leads : total Pendings from all Leads',
    }
  },
  'pending_sum': {
    id: 'pending_sum',
    type: 'columns',
    attributes: {
      title: 'Pending',
      titleShort: 'rub',
      cell: ['headerData', 'data'],
      dimension: 'rub',
      tooltip: 'total revenue from all Pendings',
    }
  },
  'rejected_count': {
    id: 'rejected_count',
    type: 'columns',
    attributes: {
      title: 'Rejected',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'how many Rejected',
    }
  },
  'rejected_leads_prct': {
    id: 'rejected_leads_prct',
    type: 'columns',
    attributes: {
      title: 'Rejected % from Lead',
      titleShort: '% from Lead',
      cell: ['headerData', 'data'],
      dimension: '%',
      tooltip: '= rejected_count / leads : total Rejected from all Leads',
    }
  },
  'rejected_sum': {
    id: 'rejected_sum',
    type: 'columns',
    attributes: {
      title: 'Rejected',
      titleShort: 'rub',
      cell: ['headerData', 'data'],
      dimension: 'rub',
      tooltip: 'total revenue from all Rejected',
    }
  },
  'users': {
    id: 'users',
    type: 'columns',
    attributes: {
      title: '::user::',
      titleShort: 'units',
      cell: ['headerData', 'data'],
      dimension: 'units',
      tooltip: 'total users with unique ID',
    }
  },
  'adjustmentA': {
    id: 'adjustmentA',
    type: 'columns',
    attributes: {
      title: 'by ROI',
      titleShort: 'roi',
      cell: ['headerAdj', 'adj'],
      dimension: 'rub',
      style: 'green',
      tooltip: 'ROI Bidding Algorithm'
    }
  },
  'adjustmentB': {
    id: 'adjustmentB',
    type: 'columns',
    attributes: {
      title: 'by Lead',
      titleShort: 'lead',
      cell: ['headerAdj', 'adj'],
      dimension: 'rub',
      style: 'red',
      tooltip: 'Lead Rate Reduction Algorithm'
    }
  }
}

export const columnsOrder = [
  'name',
  'impres',
  'impres_cost',
  'clicks',
  'CTR',
  'CPC',
  'bounces',
  'bounces_prct',
  'events',
  'enter_landing',
  'events_per_user',
  'change_filter',
  'change_direction',
  'offer_details',
  'click_unique',
  'click_unique_prct',
  'click_unique_cost',
  'click_offer',
  'adjustmentA',
  'adjustmentB',
  'leads',
  'leads_unique',
  'leads_prct',
  'leads_count_per_click_unique',
  'leads_cost',
  'pending_count',
  'pending_sum',
  'approved_unique',
  'approved_count',
  'approved_cost',
  'approved_sum',
  'rejected_count',
  'rejected_sum',
  'cost',
  'ROI'
]

const trueProps = (result, prop) => ({...result, [prop]: true})

const originalAttributes = columnsOrder
  .filter(column => column !== 'adjustmentA' && column !== 'adjustmentB')

export const needClicks = originalAttributes
  .slice(2)
  .reduce(trueProps, {})

export const needLeads = originalAttributes
  .slice(19)
  .reduce(trueProps, {})

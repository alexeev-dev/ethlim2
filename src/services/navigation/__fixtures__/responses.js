export const fetching = {
  ids: 'fetching'
}

const rawResponses = {
  empty: {
    count: 0, next: null,
    previous: null, results: []
  },
  trafficSources: {
    count: 1, next: null, previous: null,
    results: [{id: 1, name: 'Yandex'}]
  },
  platforms: {
    count: 2, next: null, previous: null,
    results: [
      {id: 1, name: 'Search', traffic_source: 1},
      {id: 2, name: 'Net', traffic_source: 1}
    ]
  },
  projects: {
    count: 2, next: null, previous: null,
    results: [
      {name: 'Games', id: 1},
      {name: 'MFO', id: 2}
    ]
  }
}

const normalizedReponses = {
  bad: {
    ids: 500
  },
  empty: {
    ids: []
  },
  trafficSources: {
    data: {
      '1': {
        type: 'traffic-sources',
        id: '1',
        attributes: {name: 'Yandex'}
      }
    },
    ids: ['1']
  },
  platforms: {
    data: {
      '1': {type: 'platforms', id: '1', attributes: {name: 'Search'}},
      '2': {type: 'platforms', id: '2', attributes: {name: 'Net'}}
    },
    ids: ['1', '2']
  },
  projects: {
    data: {
      '1': {type: 'projects', id: '1', attributes: {name: 'Games'}},
      '2': {type: 'projects', id: '2', attributes: {name: 'MFO'}}
    },
    ids: ['1', '2']
  }
}

export function getResponse(name) {
  return rawResponses[name]
}

export function getNormalizedResponse(name) {
  return normalizedReponses[name]
}

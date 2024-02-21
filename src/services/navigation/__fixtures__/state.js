const fullState = {
  trafficSources: {
    data: {
      '1': {
        id: '1',
        type: 'traffic-sources',
        attributes: {
          name: 'Yandex'
        }
      },
      '2': {
        id: '2',
        type: 'traffic-sources',
        attributes: {
          name: 'Google'
        }
      }
    },
    ids: ['1', '2'],
    selected: '1'
  },
  platforms: {
    data: {
      '1': {type: 'platforms', id: '1', attributes: {name: 'Search'}},
      '2': {type: 'platforms', id: '2', attributes: {name: 'Net'}}
    },
    ids: ['1', '2'],
    selected: '2'
  },
  projects: {
    data: {
      '1': {type: 'projects', id: '1', attributes: {name: 'Games'}},
      '2': {type: 'projects', id: '2', attributes: {name: 'MFO'}}
    },
    ids: ['1', '2'],
    selected: '2'
  }
}

export function makeNavState(trafficSources, platforms, projects) {
  return {
    trafficSources: makeSubState('trafficSources', trafficSources),
    platforms: makeSubState('platforms', platforms),
    projects: makeSubState('projects', projects)
  }
}

function makeSubState(entityType, stateInfo = [null, false]) {
  const data = stateInfo[0] === 'ids'
    ? fullState[entityType].data
    : {}
  const selected = stateInfo[1]
    ? fullState[entityType].selected
    : null
  const ids = makeIdsState(entityType, stateInfo[0])
  return {ids, data, selected}
}

function makeIdsState(entityType, stateInfo) {
  switch (stateInfo) {
    case 'ids':
      return fullState[entityType].ids
    case 'fetching':
      return 'fetching'
    case 'error':
      return 500
    default:
      return null
  }
}

export function makeItemsList(entityType, metaIds) {
  return metaIds.map(extractItemData(entityType))
}

function extractItemData(entityType) {
  return function extractItemDataImpl(metaId) {
    return {
      ...fullState[entityType].data[metaId[0]],
      meta: {
        isFetching: metaId[1] || false,
        isSelected: metaId[2] || false,
        hasError: metaId[3] || false,
        errorCode: metaId[4] || 0
      }
    }
  }
}

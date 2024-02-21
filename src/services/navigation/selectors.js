export function getNavPosition(state) {
  return {
    trafficSource: state.trafficSources.selected,
    platform: state.platforms.selected,
    project: state.projects.selected
  }
}

export function getNavStatus(state) {
  const {ids} = state.trafficSources
  return Array.isArray(ids) ? 'ready' : ids
}
export const getProjectStatus = (state) => state.projects.selected ? true : false

export const getSelectedTrafficSource = makeEntitySelector('trafficSources')
export const getSelectedPlatform = makeEntitySelector('platforms')
export const getSelectedProject = makeEntitySelector('projects')

export const getTrafficSources = getItemsByType('trafficSources')
export const getPlatforms = getItemsByType('platforms')
export const getProjects = getItemsByType('projects')

function getItemsByType(entityType) {
  return function getItems(state) {
    const {ids} = state[entityType]
    if (Array.isArray(ids)) {
      return ids.map(id => ({
        ...state[entityType].data[id],
        meta: getItemMeta(entityType, state, id)
      }))
    }
    return ids
  }
}

const nextEntityType = {
  trafficSources: 'platforms',
  platforms: 'projects'
}

function getItemMeta(entityType, state, id) {
  const isSelected = state[entityType].selected === id
  const nextType = nextEntityType[entityType]
  if (nextType && isSelected) {
    const {ids} = state[nextType]
    const error = ids !== 'fetching' && !Array.isArray(ids) ? ids : null
    return {
      isFetching: ids === 'fetching' || ids === null,
      isSelected,
      hasError: error !== null,
      errorCode: error !== null ? error : 0
    }
  }
  return {
    isFetching: false,
    isSelected,
    hasError: false,
    errorCode: 0
  }
}

function makeEntitySelector(entityType) {
  return (state) => {
    const {data, selected} = state[entityType]
    return data && data[selected] ? data[selected] : null
  }
}

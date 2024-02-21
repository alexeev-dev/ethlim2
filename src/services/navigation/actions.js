import {makeActionCreator} from 'services/utils/actions'

export const FETCH_TRAFFIC_SOURCES = 'navigation/fetchTrafficSources'
export const FETCH_PLATFORMS = 'navigation/fetchPlatforms'
export const FETCH_PROJECTS = 'navigation/fetchProjects'

export const SELECT_TRAFFIC_SOURCE = 'navigation/selectTrafficSource'
export const SELECT_PLATFORM = 'navigation/selectPlatform'
export const SELECT_PROJECT = 'navigation/selectProject'

export const fetchTrafficSources = makeActionCreator(FETCH_TRAFFIC_SOURCES)
export const fetchPlatforms = makeActionCreator(FETCH_PLATFORMS)
export const fetchProjects = makeActionCreator(FETCH_PROJECTS)

export const selectTrafficSource = makeActionCreator(SELECT_TRAFFIC_SOURCE, ['id', 'location'])
export const selectPlatform = makeActionCreator(SELECT_PLATFORM, ['id', 'location'])
export const selectProject = makeActionCreator(SELECT_PROJECT, ['id', 'location'])

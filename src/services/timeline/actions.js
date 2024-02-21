import {makeActionCreator} from '../utils/actions'

export const FETCH = 'timeline/fetch'
export const CHANGE_FILTER = 'timeline/changeFilter'

export const fetchTimeline = makeActionCreator(FETCH)
export const changeFilter = makeActionCreator(CHANGE_FILTER, ['name', 'value'])

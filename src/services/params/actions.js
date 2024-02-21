import {makeActionCreator} from 'services/utils/actions'

export const CHANGE = 'params/change'

/**
 * @function changeParam
 * @param {string} name - имя параметра
 * @param {Object|string} value - значение параметра
 * @returns {Object} экшен для изменения параметра name на значение value
 */

export const changeParam = makeActionCreator(CHANGE, ['name', 'value'])

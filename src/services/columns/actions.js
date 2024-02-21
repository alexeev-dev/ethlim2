import {makeActionCreator} from '../utils/actions'

export const CHANGE_ORDER = 'columns/changeOrder'
export const TOGGLE_COLUMN = 'columns/toggleColumn'

/**
 * @function changeOrder
 * @param {String[]} newOrder - новый порядок колонок. ВАЖНО: перечислять
 * нужно как активные колонки, так и колонки которые отключены
 * @returns {Object} экшен для изменения порядка колонок
 * @example changeOrder(['name', 'CTR', 'CPC'])
 */

export const changeOrder = makeActionCreator(CHANGE_ORDER)

/**
 * @function toggleColumn
 * @param {String} columnName - идентификатор колонки, которую тогглим
 * @returns {Object} экшен для изменения состояния колонки
 * @example toggleColumn('click_offer')
 */

export const toggleColumn = makeActionCreator(TOGGLE_COLUMN)

import {SUCCESS, ERROR} from '../utils/actions'

// ========================================================================= //
//                     Загрузчики данных для нормализации                    //
// ========================================================================= //

const loadTrafficSource = makeLoader('traffic-sources')
const loadPlatform = makeLoader('platforms')
const loadProject = makeLoader('projects')

// ========================================================================= //
//                Нормализаторы данных для разных сущностей                  //
// ========================================================================= //

/**
 * @function
 * @param {string} status - статус выполнения запроса (SUCCESS, ERROR, undefined)
 * @param {object} response - ответ сервера (данные либо код ошибки)
 * @returns нормализованные данные по источникам трафика (Яндекс, Google)
 */

export const normalizeTrafficSources = makeNormalizer(loadTrafficSource)

/**
 * @function
 * @param {string} status - статус выполнения запроса (SUCCESS, ERROR, undefined)
 * @param {object} response - ответ сервера (данные либо код ошибки)
 * @returns нормализованные данные по платформам (Поиск, РСЯ)
 */

export const normalizePlatforms = makeNormalizer(loadPlatform)

/**
 * @function
 * @param {string} status - статус выполнения запроса (SUCCESS, ERROR, undefined)
 * @param {object} response - ответ сервера (данные либо код ошибки)
 * @returns нормализованные данные по проектам (Игры, МФО)
 */

export const normalizeProjects = makeNormalizer(loadProject)

// ========================================================================= //
//                          Вспомогательные функции                          //
// ========================================================================= //

/**
 * @param loader - функция-загрузчик данных
 * @returns возвращает функцию-нормализатор
 */

function makeNormalizer(loader) {
  return function normalizeGeneric(status, response) {
    if (status === SUCCESS) {
      const {count, results} = response
      return count > 0
        ? {ids: results.map(getItemId), data: results.reduce(loader, {})}
        : {ids: []}
    } else if (status === ERROR) {
      return {ids: response}
    }
    return {ids: 'fetching'}
  }
}

/**
 * Конструирует функцию-загрузчик для заданного типа сущности
 * @param {string} entityType - тип сущности
 * @returns возвращает функцию-загрузчик
 */

function makeLoader(entityType) {
  return function loadItem(result, rawItem) {
    const item = makeItem(entityType, rawItem)
    return {...result, [item.id]: item}
  }
}

/**
 * Конструирует объект сущности
 * @param {string} entityType - тип сущности
 * @param {object} rawItem - данные сущности из ответа (сырые данные)
 * @returns возвращает подготовленные данные сущности
 */

function makeItem(entityType, rawItem) {
  return {
    type: entityType,
    id: rawItem.id.toString(),
    attributes: {name: rawItem.name}
  }
}

/**
 * @param {object} item - данные сущности
 * @returns возвращает идентификатор сущности
 */

function getItemId(item) {
  return item.id.toString()
}

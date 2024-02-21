/**
 * Нормализует объекты из массива
 * @param {Object[]} items - массив подлежащий нормализации
 * @param {function} [processor] - функция для обработки объектов
 * @returns {Object} нормализованные объекты
 * @example
 * const items = [
 *   {id: 1, type: 'fruits', attributes: {name: 'apple'}},
 *   {id: 2, type: 'fruits', attributes: {name: 'orange'}},
 *   {id: 1, type: 'stars', attributes: {name: 'sun'}}
 * ]
 * // Вернёт: {
 * //   fruits: {
 * //     '1': {id: 1, type: 'fruits', attributes: {name: 'apple'}},
 * //     '2': {id: 2, type: 'fruits', attributes: {name: 'orange'}}
 * //   },
 * //   stars: {
 * //     '1': {id: 1, type: 'stars', attributes: {name: 'sun'}}
 * //   }
 * // }
 * normalize(items)
 */

export function normalize(items, processor) {
  const max = items.length
  const result = {}

  for (let i = 0; i < max; i++) {
    const item = items[i]
    if (typeof result[item.type] === 'undefined') {
      result[item.type] = {}
    }
    if (typeof processor === 'function') {
      result[item.type][item.id] = processor(item)
    } else {
      result[item.type][item.id] = item
    }
  }

  return result
}

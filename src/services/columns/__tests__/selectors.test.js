import {getActiveColumns} from '../selectors'
import {initialState} from '../reducer'
import {columns} from '../columns'

describe('getActiveColumns(state)', () => {
  test('Возвращает данные активных колонок', () => {
    const actual = getActiveColumns(initialState)
    expect(actual).toEqual([columns.name, columns.CPC, columns.ROI])
  })
})

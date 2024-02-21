import {getItems} from '../selectors'

test('Селектор getItems() возвращает всю историю', () => {
  const actual = getItems({items: [1, 2, 3]})
  expect(actual).toEqual([1, 2, 3])
})

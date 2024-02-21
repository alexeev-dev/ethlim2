import {to64, hash32} from '../hash'

describe('Утилита to64()', () => {
  test('Число 0 преобразует в 0', () => {
    expect(to64(0)).toBe('0')
  })

  test('Число 3015 преобразует в l7', () => {
    expect(to64(3015)).toBe('l7')
  })

  test('Число 3015 преобразует в l7', () => {
    expect(to64(3015)).toBe('l7')
  })

  test('Число 4294967295 преобразует в 3-----', () => {
    expect(to64(4294967295)).toBe('3-----')
  })
})

describe('Утилита hash32()', () => {
  test('Хэширует пустую строку', () => {
    expect(hash32('')).toBe('2179t5')
  })

  test('Хэширует обычную строку', () => {
    expect(hash32('Hello world!')).toBe('QDYSa')
  })
})

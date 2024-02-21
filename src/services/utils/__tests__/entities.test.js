import {normalize} from '../entities'

const homogeneousData = [
  {
    id: 'b140',
    type: 'fruits',
    attributes: {
      name: 'apple'
    }
  },
  {
    id: 'b240',
    type: 'fruits',
    attributes: {
      name: 'orange'
    }
  },
  {
    id: 'b170',
    type: 'fruits',
    attributes: {
      name: 'banana'
    }
  }
]

const heterogeneousData = [
  {
    id: 'b140',
    type: 'fruits',
    attributes: {
      name: 'apple'
    }
  },
  {
    id: 'b240',
    type: 'fruits',
    attributes: {
      name: 'orange'
    }
  },
  {
    id: 'b240',
    type: 'stars',
    attributes: {
      name: 'sun'
    }
  }
]

describe('Утилита normalize(items, processor)', () => {
  test('Нормализует пустой массив', () => {
    const actual = normalize([])
    expect(actual).toEqual({})
  })

  test('Нормализует данные одного типа', () => {
    const actual = normalize(homogeneousData)
    expect(actual).toEqual({
      'fruits': {
        'b140': homogeneousData[0],
        'b240': homogeneousData[1],
        'b170': homogeneousData[2]
      }
    })
  })

  test('Нормализует данные разного типа', () => {
    const actual = normalize(heterogeneousData)
    expect(actual).toEqual({
      'fruits': {
        'b140': heterogeneousData[0],
        'b240': heterogeneousData[1]
      },
      'stars': {
        'b240': heterogeneousData[2]
      }
    })
  })

  test('Обрабатывает данные при помощи "processor"', () => {
    const processItem = (item) => ({
      ...item, attributes: {
        name: item.attributes.name + '-test'
      }
    })
    const processor = jest.fn(processItem)
    const actual = normalize(heterogeneousData, processor)
    expect(actual).toEqual({
      'fruits': {
        'b140': processItem(heterogeneousData[0]),
        'b240': processItem(heterogeneousData[1])
      },
      'stars': {
        'b240': processItem(heterogeneousData[2])
      }
    })
    expect(processor).toHaveBeenCalledTimes(3)
    expect(processor).toHaveBeenCalledWith(heterogeneousData[0])
    expect(processor).toHaveBeenCalledWith(heterogeneousData[1])
    expect(processor).toHaveBeenCalledWith(heterogeneousData[2])
  })
})

import { equals } from 'ramda'

import { next, prev } from './ramda'

describe('ramda', () => {
  it('next(pred)(arr) works', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(next(equals(1))([])).toBeUndefined()
    expect(next(equals(1))([1])).toBe(1)
    expect(next(equals(1))([1, 2])).toBe(2)
    expect(next(equals(1))(arr)).toBe(2)
    expect(next(equals(3))(arr)).toBe(4)
    expect(next(equals(5))(arr)).toBe(1)
  })

  it('prev(pred)(arr) works', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(prev(equals(1))(arr)).toBe(5)
    expect(prev(equals(3))(arr)).toBe(2)
    expect(prev(equals(5))(arr)).toBe(4)
  })
})

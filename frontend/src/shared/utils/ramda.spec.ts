import { equals, isNil, set, view } from 'ramda'
import { isNaturalNumber, isString } from 'ramda-adjunct'

import { TreeNode } from '../algebraic/treeNode'
import {
  lensNext,
  mapByProperty,
  matches,
  matchesArr,
  next,
  prev,
  replaceSlice,
  satiated
} from './ramda'

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
    expect(prev(equals(2))(arr)).toBe(1)
    expect(prev(equals(3))(arr)).toBe(2)
    expect(prev(equals(5))(arr)).toBe(4)
  })

  it('pathToRoot', () => {
    const start = TreeNode.of(9)
    TreeNode.of(1, [
      TreeNode.of(2),
      TreeNode.of(3, [TreeNode.of(6, [start])]),
      TreeNode.of(4, [TreeNode.of(7)]),
      TreeNode.of(5, [TreeNode.of(8)])
    ])

    expect(start.pathToRoot()).toStrictEqual([6, 3, 1])
  })

  it('replaceSlice', () => {
    const res = replaceSlice(2, 4, 'abc', '1234567')
    expect(res).toBe('12abc567')
  })

  it('satiated', () => {
    const obj = {
      a: 1,
      b: null,
      c: false,
      d: undefined
    }
    expect(satiated(obj)).toEqual({ a: 1, c: false })
  })

  it('mapByProperty', () => {
    const arr = [
      { id: 'a', text: 'A' },
      { id: 'b', text: 'B' },
      { id: 'c', text: 'D' }
    ] as const

    const res = mapByProperty('id')(arr)
    expect(res).toHaveProperty('a')
    expect(res).toHaveProperty('b')
    expect(res).toHaveProperty('c')
    expect(res.a).toBe(arr[0])
    expect(res.b).toBe(arr[1])
    expect(res.c).toBe(arr[2])
  })

  it('matches', () => {
    expect(matches(isNil, isString, isNaturalNumber)(null, 'a', 3)).toBe(true)
    expect(matches(isNil, isNaturalNumber, isNaturalNumber)(null, 'a', 3)).toBe(false)
  })

  it('matchesArr', () => {
    expect(matchesArr(isNil, isString, isNaturalNumber)([null, 'a', 3])).toBe(true)
    expect(matchesArr(isNil, isNaturalNumber, isNaturalNumber)([null, 'a', 3])).toBe(false)
  })

  it('lensNext works', () => {
    const arr = [2, 4, 6, 8, 10]
    const copy = [...arr]

    expect(view(lensNext(equals(2)), arr)).toEqual(4)
    expect(view(lensNext(equals(6)), arr)).toEqual(8)
    expect(view(lensNext(equals(10)), arr)).toBeUndefined()
    expect(view(lensNext(equals(11)), arr)).toBeUndefined()
    expect(arr).toStrictEqual(copy)

    expect(set(lensNext(equals(2)), 5, arr)).toEqual([2, 5, 6, 8, 10])
    expect(set(lensNext(equals(11)), 5, arr)).toEqual([2, 4, 6, 8, 10])
  })
})

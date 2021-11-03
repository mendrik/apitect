import { equals } from 'ramda'

import { TreeNode } from '../algebraic/treeNode'
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
})

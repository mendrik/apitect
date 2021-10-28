import { add, equals, propOr } from 'ramda'
import { isOdd } from 'ramda-adjunct'

import { Strategy, TreeNode } from './treeNode'

describe('TreeNode', () => {
  it('Flatten depth first', () => {
    const x = TreeNode.of(1, [
      TreeNode.of(2),
      TreeNode.of(3, [TreeNode.of(4, [TreeNode.of(5)]), TreeNode.of(6)]),
      TreeNode.of(7)
    ])
    expect(x.flatten(Strategy.Depth)).toStrictEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('Flatten breadth first', () => {
    const x = TreeNode.of(1, [
      TreeNode.of(2),
      TreeNode.of(3, [TreeNode.of(5, [TreeNode.of(7)])]),
      TreeNode.of(4, [TreeNode.of(6)])
    ])
    expect(x.flatten()).toStrictEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('Map tree', () => {
    const x = TreeNode.of(1, [
      TreeNode.of(2),
      TreeNode.of(3, [TreeNode.of(5, [TreeNode.of(7)])]),
      TreeNode.of(4, [TreeNode.of(6)])
    ])
    expect(x.map(n => `${n}`).flatten()).toStrictEqual(['1', '2', '3', '4', '5', '6', '7'])
  })

  it('Reduce tree', () => {
    const x = TreeNode.of(1, [
      TreeNode.of(2),
      TreeNode.of(3, [TreeNode.of(5, [TreeNode.of(7)])]),
      TreeNode.of(4, [TreeNode.of(6)])
    ])
    expect(x.reduce(add, 0)).toBe(28)
  })

  it('Filter tree', () => {
    const x = TreeNode.of(1, [
      TreeNode.of(2),
      TreeNode.of(3, [TreeNode.of(5, [TreeNode.of(7)])]),
      TreeNode.of(4, [TreeNode.of(6)])
    ])
    expect(x.filter(isOdd)?.flatten()).toStrictEqual([1, 3, 5, 7])
  })

  it('Tree equals', () => {
    const a = TreeNode.of(1, [TreeNode.of(2), TreeNode.of(3)])
    const b = TreeNode.of(1, [TreeNode.of(2), TreeNode.of(3)])
    expect(equals(a, b)).toEqual(true)
    expect(a.equals(b)).toEqual(true)
    expect(b.equals(a)).toEqual(true)
  })

  it('Can create simple tree', () => {
    const data = {
      name: 'andreas',
      friends: [{ name: 'peter' }, { name: 'thomas', friends: [{ name: 'anja' }] }]
    }
    const tree = TreeNode.basedOn('friends', 'name')(data)
    expect(tree.flatten()).toStrictEqual(['andreas', 'peter', 'thomas', 'anja'])
  })

  it('Can create object tree', () => {
    const data = {
      name: 'andreas',
      age: 45,
      friends: [
        { name: 'peter', age: 35 },
        { name: 'thomas', age: 43, friends: [{ name: 'anja', age: 39 }] }
      ]
    }
    const tree = TreeNode.basedOn('friends')(data)
    expect(tree.map(propOr(0, 'age')).flatten()).toStrictEqual([45, 35, 43, 39])
  })
})

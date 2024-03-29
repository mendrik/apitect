import { equals, prop, propEq } from 'ramda'
import { isOdd } from 'ramda-adjunct'

import { Strategy, TreeNode } from './treeNode'

describe('TreeNode', () => {
  it('Flatten depth first', () => {
    const x = TreeNode.of(1, [
      TreeNode.of(2),
      TreeNode.of(3, [
        TreeNode.of(4, [TreeNode.of(5), TreeNode.of(6)]),
        TreeNode.of(7, [TreeNode.of(8)])
      ]),
      TreeNode.of(9)
    ])
    expect(x.flatten(Strategy.Depth).map(prop('value'))).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('Flatten breadth first', () => {
    const x = TreeNode.of(1, [
      TreeNode.of(2),
      TreeNode.of(3, [TreeNode.of(6, [TreeNode.of(9)])]),
      TreeNode.of(4, [TreeNode.of(7)]),
      TreeNode.of(5, [TreeNode.of(8)])
    ])
    expect(x.toArray()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('Map tree', () => {
    const x = TreeNode.of(1, [
      TreeNode.of(2),
      TreeNode.of(3, [TreeNode.of(5, [TreeNode.of(7)])]),
      TreeNode.of(4, [TreeNode.of(6)])
    ])
    expect(x.map(n => `${n}`).toArray()).toStrictEqual(['1', '2', '3', '4', '5', '6', '7'])
  })

  it('Reduce tree (depth)', () => {
    // prettier-ignore
    const x = TreeNode.of(1, [
      TreeNode.of(2, [TreeNode.of(3)]),
      TreeNode.of(4, [TreeNode.of(5)])
    ])
    expect(x.reduce((acc, n) => [...acc, n], [] as number[])).toStrictEqual([1, 2, 3, 4, 5])
  })

  it('Extract', () => {
    const x = TreeNode.of({ id: 1 }, [
      TreeNode.of({ id: 2 }, [TreeNode.of({ id: 3 })]),
      TreeNode.of({ id: 4 }, [TreeNode.of({ id: 5 })])
    ])
    expect(x.extract()).toStrictEqual({
      id: 1,
      children: [
        { id: 2, children: [{ id: 3, children: [] }] },
        { id: 4, children: [{ id: 5, children: [] }] }
      ]
    })
  })

  it('Filter tree', () => {
    const x = TreeNode.of(1, [
      TreeNode.of(2),
      TreeNode.of(3, [TreeNode.of(5, [TreeNode.of(7)])]),
      TreeNode.of(4, [TreeNode.of(6)])
    ])
    expect(x.filter(isOdd)?.toArray()).toStrictEqual([1, 3, 5, 7])
  })

  it('Node next', () => {
    const start = TreeNode.of(6)
    const leaf = TreeNode.of(2)
    TreeNode.of(1, [
      leaf,
      TreeNode.of(3, [TreeNode.of(5, [TreeNode.of(7)])]),
      TreeNode.of(4, [start])
    ])
    expect(start.next()?.value).toEqual(2)
    expect(start.next(false)?.value).toEqual(1)
    expect(leaf.next()?.value).toEqual(3)
    expect(leaf.next(false)?.value).toEqual(3)
  })

  it('Node prev', () => {
    const start = TreeNode.of(2)
    const last = TreeNode.of(6)
    TreeNode.of(1, [
      start,
      TreeNode.of(3, [TreeNode.of(5, [TreeNode.of(7)])]),
      TreeNode.of(4, [last])
    ])
    expect(start.prev()?.value).toEqual(6)
    expect(start.prev(false)?.value).toEqual(1)
    expect(last.prev()?.value).toEqual(4)
    expect(last.prev(false)?.value).toEqual(4)
  })

  it('Tree equals', () => {
    const a = TreeNode.of(1, [TreeNode.of(2), TreeNode.of(3)])
    const b = TreeNode.of(1, [TreeNode.of(2), TreeNode.of(3)])
    expect(equals(a, b)).toEqual(true)
    expect(a.equals(b)).toEqual(true)
    expect(b.equals(a)).toEqual(true)
  })

  it('Can create simple tree', () => {
    type Data = {
      name: string
      friends?: Data[]
    }
    const data: Data = {
      name: 'andreas',
      friends: [{ name: 'peter' }, { name: 'thomas', friends: [{ name: 'anja' }] }]
    }
    const tree = TreeNode.from<Data, 'friends', 'name'>('friends', 'name')(data)
    expect(tree.toArray()).toStrictEqual(['andreas', 'peter', 'thomas', 'anja'])
  })

  it('Can create object tree', () => {
    type Data = {
      name: string
      age: number
      friends?: Data[]
    }
    const data = {
      name: 'andreas',
      age: 45,
      friends: [
        { name: 'peter', age: 35 },
        { name: 'thomas', age: 43, friends: [{ name: 'anja', age: 39 }] }
      ]
    }
    const tree = TreeNode.from<Data, 'friends'>('friends')(data)
    expect(tree.map(prop('age')).toArray()).toStrictEqual([45, 35, 43, 39])
  })

  it('Finds node by predicate', () => {
    type Data = {
      name: string
      age: number
      friends?: Data[]
    }
    const data = {
      name: 'andreas',
      age: 45,
      friends: [
        { name: 'peter', age: 35 },
        { name: 'thomas', age: 43, friends: [{ name: 'anja', age: 39 }] }
      ]
    }
    const tree = TreeNode.from<Data, 'friends'>('friends')(data)
    expect(tree.first(propEq('age', 43))).toHaveProperty(['value', 'name'], 'thomas')
  })
})

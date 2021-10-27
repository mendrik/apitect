import { add } from 'ramda'

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
})

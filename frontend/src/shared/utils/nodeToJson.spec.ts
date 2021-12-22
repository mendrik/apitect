import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { nodeToJson } from '~shared/utils/nodeToJson'

import tree from '../../fixtures/tree.json'

describe('nodeToJson', () => {
  it('serialization works', () => {
    const x = TreeNode.from<Node, 'children'>('children')(tree as any)
    expect(nodeToJson(x, {})).toBe({})
  })
})

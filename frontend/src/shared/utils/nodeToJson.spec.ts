import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { nodeToJson } from '~shared/utils/nodeToJson'

import tree from '../../fixtures/tree.json'
import values from '../../fixtures/values.json'

const x = TreeNode.from<Node, 'children'>('children')(tree as any)

describe('nodeToJson', () => {
  it('serialization works', () => {
    const json = nodeToJson(x, values as any)
    expect(json).toStrictEqual({
      Name: 'Andreas',
      Switch: false,
      Date: '2021-12-22T12:07:42.074Z',
      Dropdown: 'Option-1',
      Price: 12345
    })
  })
})

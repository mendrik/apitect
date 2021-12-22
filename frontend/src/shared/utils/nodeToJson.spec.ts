import { TreeNode } from '~shared/algebraic/treeNode'
import { Node, NodeId } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { nodeToJson } from '~shared/utils/nodeToJson'
import { byProp } from '~shared/utils/ramda'

import tree from '../../fixtures/tree.json'
import values from '../../fixtures/values.json'

const x = TreeNode.from<Node, 'children'>('children')(tree as any)
const v = byProp<'nodeId', any>('nodeId')(values as any) as any as Record<NodeId, Value>

describe('nodeToJson', () => {
  it('serialization works', () => {
    const json = nodeToJson(x, v)
    expect(json).toStrictEqual({
      Name: 'Andreas',
      Switch: false,
      Date: '2021-12-22T12:07:42.074Z',
      Dropdown: 'Option-1',
      Price: 12345
    })
  })
})
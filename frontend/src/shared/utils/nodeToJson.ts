import { cond, propEq, T as Otherwise } from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Value } from '~shared/types/domain/values/value'

export const nodeToJson = (node: TreeNode<Node>, values: Record<NodeId, Value>) => {
  const getArrayContent = (child: Node) => []

  const childJson: (node: Node) => object = cond([
    [
      propEq('nodeType', NodeType.Object),
      (node: Node) =>
        isNilOrEmpty(node.children)
          ? values[node.id]?.value
          : node.children.reduce((acc, cur) => ({ ...acc, [cur.name]: childJson(cur) }), {})
    ],
    [propEq('nodeType', NodeType.Array), getArrayContent],
    [Otherwise, (node: Node) => values[node.id]?.value]
  ])

  return node.map(childJson).extract()
}

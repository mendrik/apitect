import { cond, pipe, propEq, propOr, reduce, T as Otherwise } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Value } from '~shared/types/domain/values/value'

export const nodeToJson = (node: TreeNode<Node>, values: Record<NodeId, Value>) => {
  const getArrayContent = (child: Node) => []

  const toJson: (node: Node) => object = cond([
    [
      propEq('nodeType', NodeType.Object),
      pipe<any, Node[], any>(
        propOr([], 'children'),
        reduce((acc, cur) => ({ ...acc, [cur.name]: toJson(cur) }), {})
      )
    ],
    [propEq('nodeType', NodeType.Array), getArrayContent],
    [Otherwise, (node: Node) => values[node.id]?.value]
  ])

  return toJson(node.extract())
}

import { cond, pipe, propOr, propSatisfies, reduce, T as Otherwise } from 'ramda'
import { included } from 'ramda-adjunct'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Value } from '~shared/types/domain/values/value'

export const nodeToJson = (node: TreeNode<Node>, values: Record<NodeId, Value>) => {
  const getArrayContent = (child: Node) => []

  const toJson: (node: Node) => object = cond([
    [
      propSatisfies(included([NodeType.Array, NodeType.Object]), 'nodeType'),
      pipe<any, Node[], any>(
        propOr([], 'children'),
        reduce((acc, cur) => ({ ...acc, [cur.name]: toJson(cur) }), {})
      )
    ],
    [Otherwise, (node: Node) => values[node.id]?.value]
  ])

  return toJson(node.extract())
}

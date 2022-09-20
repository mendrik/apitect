import { cond, pipe, propOr, propSatisfies, reduce, T as Otherwise } from 'ramda'
import { included } from 'ramda-adjunct'
import { JsonObject } from 'react-use-websocket/dist/lib/types'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Value } from '~shared/types/domain/values/value'

export const nodeToJson = (node: TreeNode<Node>, values: Record<NodeId, Value>): JsonObject => {
  const value = (node: Node) => values[node.id]?.value
  const toJson: (node: Node) => JsonObject = cond([
    [
      propSatisfies(included([NodeType.Array, NodeType.Object]), 'nodeType'),
      pipe<any, Node[], any>(
        propOr([], 'children'),
        reduce((acc, cur) => ({ ...acc, [cur.name]: toJson(cur) }), {})
      )
    ],
    [Otherwise, value]
  ])

  return toJson(node.extract())
}

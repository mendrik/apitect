import { cond, Dictionary, pipe, propOr, propSatisfies, reduce, T as Otherwise } from 'ramda'
import { included } from 'ramda-adjunct'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Value } from '~shared/types/domain/values/value'
import { Json } from '~shared/types/generic'
import { mapByProperty } from '~shared/utils/ramda'

export const nodeToJson = (node: TreeNode<Node>, values: Value[]): Dictionary<Json> => {
  const mappedValues = mapByProperty('nodeId')(values)
  const value = (node: Node) => mappedValues[node.id]?.value
  const toJson: (node: Node) => Dictionary<Json> = cond([
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

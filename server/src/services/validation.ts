import { cond, propEq, propOr, reduce, T as Otherwise } from 'ramda'
import { array, boolean, object, ZodObject } from 'zod'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Enum } from '~shared/types/domain/enums'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { DateSettings } from '~shared/types/forms/nodetypes/dateSettings'
import { EnumSettings } from '~shared/types/forms/nodetypes/enumSettings'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'
import { NumberSettings } from '~shared/types/forms/nodetypes/numberSettings'
import { StringSettings } from '~shared/types/forms/nodetypes/stringSettings'
import { byProp } from '~shared/utils/ramda'
import { getDateValidator } from '~shared/validators/dateValidator'
import { getEnumValidator } from '~shared/validators/enumValidator'
import { getNumberValidator } from '~shared/validators/numberValidator'
import { getStringValidator } from '~shared/validators/stringValidator'

import { enums } from '../api/enums'
import { allNodeSettings } from '../api/nodeSettings'

export const nodeToValidator = async (
  node: TreeNode<Node>,
  docId: string,
  email: string
): Promise<ZodObject<any>> => {
  const enumerations: Record<string, Enum> = await enums({ docId, email })
    .then<Enum[]>(propOr([], 'enums'))
    .then(byProp('name'))

  const reducer = (acc: ZodObject<any>, cur: Node) => acc.setKey(cur.name, toValidator(cur))

  const nodeSettings: Record<NodeId, NodeSettings> = await allNodeSettings(docId).then(
    byProp('nodeId')
  )

  const primitiveValidator = (node: Node) => {
    const settings: NodeSettings | undefined = nodeSettings[node.id]
    switch (node.nodeType) {
      case NodeType.Boolean:
        return boolean()
      case NodeType.Number:
        return getNumberValidator(settings as NumberSettings)
      case NodeType.Date:
        return getDateValidator(settings as DateSettings)
      case NodeType.String:
        return getStringValidator(settings as StringSettings)
      case NodeType.Enum:
        const enumSettings = settings as EnumSettings | undefined
        const e: Enum | undefined = enumerations[enumSettings?.enumeration ?? '']
        return getEnumValidator(e, enumSettings)
      default:
        throw Error(`No validator found for nodeType ${node.nodeType}`)
    }
  }

  const toValidator: (node: Node) => ZodObject<any> = cond<[Node], any>([
    [
      propEq('nodeType', NodeType.Object),
      (node: Node) => reduce(reducer, object({}), node.children)
    ],
    [
      propEq('nodeType', NodeType.Array),
      (node: Node) => array(toValidator({ ...node, nodeType: NodeType.Object }))
    ],
    [Otherwise, primitiveValidator]
  ]) as any

  return toValidator(node.extract())
}

import { cond, prop, propEq, propOr, propSatisfies, T } from 'ramda'
import { included } from 'ramda-adjunct'
import { boolean, object, ZodObject, ZodType } from 'zod'
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
import { getLastDocument } from './document'
import { getTree, toTreeNode } from './tree'

type ValidationOptions = {
  enumerations: Record<string, Enum>
  nodeSettings: Record<string, NodeSettings>
}

const getValidator = (
  nodeType: NodeType,
  options: ValidationOptions,
  nodeSettings?: NodeSettings
): ZodType<any> => {
  switch (nodeType) {
    case NodeType.Boolean:
      return boolean()
    case NodeType.Number:
      return getNumberValidator(nodeSettings as NumberSettings)
    case NodeType.Date:
      return getDateValidator(nodeSettings as DateSettings)
    case NodeType.String:
      return getStringValidator(nodeSettings as StringSettings)
    case NodeType.Enum:
      const enumSettings = nodeSettings as EnumSettings | undefined
      const e = enumSettings?.enumeration
        ? options.enumerations[enumSettings?.enumeration]
        : undefined
      return getEnumValidator(e, enumSettings)
    default:
      throw Error(`No validator found for nodeType ${nodeType}`)
  }
}

const getZodObject = (
  acc: ZodObject<any>,
  nodes: TreeNode<Node>[],
  options: ValidationOptions
): ZodObject<any> => {
  nodes.forEach(
    cond([
      [
        propSatisfies(included([NodeType.Object, NodeType.Array]), 'nodeType'),
        (n: TreeNode<Node>) =>
          acc.setKey(n.value.name, getZodObject(object({}), n.children, options))
      ],
      [T, (n: TreeNode<Node>) => acc.setKey(n.value.name, getValidator(n.value.nodeType, options))]
    ])
  )
  return acc
}
const getNodeValidator = async (
  docId: string,
  email: string,
  nodeId: NodeId
): Promise<ZodObject<any>> => {
  const tree = await getTree(docId)
  const node = tree.first(propEq('id', nodeId))
  if (node == null) {
    throw Error(`Node ${nodeId} not found in document ${docId}.`)
  }
  const enumerations = await enums({ docId, email })
    .then<Enum[]>(propOr([], 'enums'))
    .then(byProp<Enum, 'name'>('name'))
  const nodeSettings = await allNodeSettings(docId).then(byProp<NodeSettings, 'nodeId'>('nodeId'))
  return getZodObject(object({}), node.children, { enumerations, nodeSettings })
}

import { cond, map, prop, propEq, propOr, T } from 'ramda'
import { any, boolean, SafeParseReturnType, ZodSchema } from 'zod'
import { Enum } from '~shared/types/domain/enums'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { TagName } from '~shared/types/domain/tag'
import { DateSettings } from '~shared/types/forms/nodetypes/dateSettings'
import { EnumSettings } from '~shared/types/forms/nodetypes/enumSettings'
import { NumberSettings } from '~shared/types/forms/nodetypes/numberSettings'
import { StringSettings } from '~shared/types/forms/nodetypes/stringSettings'
import { logger } from '~shared/utils/logger'
import { mapByProperty } from '~shared/utils/ramda'
import { getDateValidator } from '~shared/validators/dateValidator'
import { getEnumValidator } from '~shared/validators/enumValidator'
import { getNumberValidator } from '~shared/validators/numberValidator'
import { getStringValidator } from '~shared/validators/stringValidator'

import { enums } from '../api/enums'
import { allNodeSettings } from '../api/nodeSettings'
import { valueList } from '../api/valueList'
import { getNode } from './node'

export type Validation = SafeParseReturnType<any, any>

const typeIs = propEq('nodeType')

export const validateNode = async (
  docId: string,
  tag: TagName,
  nodeId: NodeId,
  email: string
): Promise<Validation[]> => {
  const node = await getNode(docId, nodeId)
  const nodeIds = map(prop('id'), node.toArray())
  const [values, enumerations, nodeSettings] = await Promise.all([
    valueList({ docId, email, payload: { tag, nodeIds } }).then(prop('values')),
    enums({ docId, email }).then<Enum[]>(propOr([], 'enums')).then(mapByProperty('name')),
    allNodeSettings(docId).then(mapByProperty('nodeId'))
  ])

  const primitiveValidator = cond<[Node], ZodSchema>([
    [typeIs(NodeType.Boolean), () => boolean().describe('boolean')],
    [typeIs(NodeType.Number), n => getNumberValidator(nodeSettings[n.id] as NumberSettings)],
    [typeIs(NodeType.Date), n => getDateValidator(nodeSettings[n.id] as DateSettings)],
    [typeIs(NodeType.String), n => getStringValidator(nodeSettings[n.id] as StringSettings)],
    [
      typeIs(NodeType.Enum),
      n => {
        const enumSettings = nodeSettings[n.id] as EnumSettings | undefined
        const e: Enum | undefined = enumerations[enumSettings?.enumeration ?? '']
        return getEnumValidator(e, enumSettings)
      }
    ],
    [T, () => any({ description: 'always valid' })]
  ])

  return node.toArray().map(valueNode => {
    const value = values.find(propEq('nodeId', valueNode.id))
    const validator = primitiveValidator(valueNode)
    const res = validator.safeParse(value?.value)
    logger.info(`Debugging ${valueNode.name}/${value?.value} - ${validator.description}`, res)
    return res
  })
}

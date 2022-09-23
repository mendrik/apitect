import { cond, map, prop, propEq, propOr, T } from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'
import { any, boolean, SafeParseReturnType, ZodError, ZodSchema } from 'zod'
import { Enum } from '~shared/types/domain/enums'
import { Id } from '~shared/types/domain/id'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { NotificationType } from '~shared/types/domain/notification'
import { TagName } from '~shared/types/domain/tag'
import { Value } from '~shared/types/domain/values/value'
import { DateSettings } from '~shared/types/forms/nodetypes/dateSettings'
import { EnumSettings } from '~shared/types/forms/nodetypes/enumSettings'
import { NumberSettings } from '~shared/types/forms/nodetypes/numberSettings'
import { StringSettings } from '~shared/types/forms/nodetypes/stringSettings'
import { notificationError } from '~shared/types/notificationError'
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

const validateNode = async (
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
    const res = validator.safeParse(value?.value, {
      path: [node.extract().name, valueNode.name, valueNode.id]
    })
    logger.debug(
      `Validating ${docId}/${tag}/${valueNode.name}/${value?.value} - ${validator.description}`,
      res
    )
    return res
  })
}

export const validateArrayNode = async (
  docId: Id,
  email: string,
  tag: string,
  arrayNodeId: Id
): Promise<Value[]> => {
  const result = await validateNode(docId, tag, arrayNodeId, email)

  const errors = result.reduce(
    (acc: ZodError[], res: Validation) => (res.success ? acc : [...acc, res.error]),
    []
  )

  if (isNotEmpty(errors)) {
    throw notificationError(
      arrayNodeId,
      'validation.server.arrayItemInvalid',
      NotificationType.VALIDATION,
      JSON.stringify({ errors })
    )
  }

  return result.map(prop('data')) as Value[]
}

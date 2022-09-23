import { map, prop, propEq, propOr } from 'ramda'
import { any, boolean, SafeParseReturnType, ZodSchema } from 'zod'
import { Enum } from '~shared/types/domain/enums'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { TagName } from '~shared/types/domain/tag'
import { Value } from '~shared/types/domain/values/value'
import { DateSettings } from '~shared/types/forms/nodetypes/dateSettings'
import { EnumSettings } from '~shared/types/forms/nodetypes/enumSettings'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'
import { NumberSettings } from '~shared/types/forms/nodetypes/numberSettings'
import { StringSettings } from '~shared/types/forms/nodetypes/stringSettings'
import { mapByProperty } from '~shared/utils/ramda'
import { throwError } from '~shared/utils/throwError'
import { getDateValidator } from '~shared/validators/dateValidator'
import { getEnumValidator } from '~shared/validators/enumValidator'
import { getNumberValidator } from '~shared/validators/numberValidator'
import { getStringValidator } from '~shared/validators/stringValidator'

import { enums } from '../api/enums'
import { allNodeSettings } from '../api/nodeSettings'
import { valueList } from '../api/valueList'
import { getNode } from './node'

export type Validation = SafeParseReturnType<Value, any>

export const validateNode = async <T extends ZodSchema<any>>(
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
        return any()
    }
  }

  return values.map(value => {
    const valueNode =
      node.first(propEq('id', value.nodeId)) ?? throwError(`Node ${value.nodeId} missing for value`)
    return primitiveValidator(valueNode.extract()).safeParse(value.value)
  })
}

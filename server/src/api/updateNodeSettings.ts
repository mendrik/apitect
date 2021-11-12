import { assoc, propEq } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'

import { withTree } from '../services'

export const updateNodeSettings: ServerApiMethod<'updateNodeSettings'> = ({
  respond,
  email,
  payload: node
}) =>
  withTree(
    respond,
    email
  )(root => root.update(propEq('id', node.nodeId), assoc('name', node.name))).then(() => void 0)

import { isNil, propEq, propSatisfies } from 'ramda'
import { ChildOperation } from '~shared/algebraic/treeNode'
import { ServerApiMethod } from '~shared/apiResponse'
import { Node } from '~shared/types/domain/tree'
import { failOn } from '~shared/utils/failOn'

import { validateTree, withTree } from '../services'

export const nodeDelete: ServerApiMethod<'nodeDelete'> = ({ respond, email, payload: id }) =>
  withTree(
    respond,
    email
  )(root => root.delete(propEq('id', id)))
    .then(failOn<ChildOperation<Node>>(propSatisfies(isNil, 'node'), 'Node not found'))
    .then(validateTree)
    .then(o => ({
      position: o.position!,
      parentNode: o.parent!.id
    }))

import { isNil, propEq, propSatisfies } from 'ramda'
import { ChildOperation } from '~shared/algebraic/treeNode'
import { ServerApiMethod } from '~shared/apiResponse'
import { Node } from '~shared/types/domain/node'
import { failOn } from '~shared/utils/failOn'

import { validateTree, withTree } from '../services'

export const nodeDelete: ServerApiMethod<'nodeDelete'> = ({ docId, payload: id }) =>
  withTree(docId)(root => root.delete(propEq('id', id)))
    .then(failOn<ChildOperation<Node>>(propSatisfies(isNil, 'node'), 'Node not found'))
    .then(validateTree)
    .then(op => ({
      position: op.position ?? 0,
      parentNode: op.parent.id,
      tree: op.self.extract()
    }))

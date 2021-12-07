import { isNil, propEq, propSatisfies, tap } from 'ramda'
import { ChildOperation } from '~shared/algebraic/treeNode'
import { ServerApiMethod } from '~shared/apiResponse'
import { Node } from '~shared/types/domain/node'
import { failOn } from '~shared/utils/failOn'

import { validateTree, withTree } from '../services'
import { collection, Collections } from '../services/database'

export const nodeDelete: ServerApiMethod<'nodeDelete'> = ({ docId, payload: id }) =>
  withTree(docId)(root => root.delete(propEq('id', id)))
    .then(failOn<ChildOperation<Node>>(propSatisfies(isNil, 'node'), 'Node not found'))
    .then(validateTree)
    .then(op => ({
      position: op.position ?? 0,
      parentNode: op.parent.id,
      tree: op.self.extract()
    }))
    .then(tap(() => collection(Collections.values).deleteMany({ docId, nodeId: id })))

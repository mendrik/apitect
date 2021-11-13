import { propEq } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { newId } from '~shared/codecs/idCodec'

import { validateTree, withTree } from '../services/'

export const nodeCreate: ServerApiMethod<'nodeCreate'> = ({ email, payload: newNode }) =>
  withTree(email)(root =>
    root.insert(propEq('id', newNode.parentNode), {
      id: newId(),
      name: newNode.name,
      children: [],
      nodeType: newNode.nodeType
    })
  )
    .then(validateTree)
    .then(op => ({
      nodeId: op.node!.id,
      tree: op.self.extract()
    }))

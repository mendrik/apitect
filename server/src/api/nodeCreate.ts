import { isNil, propEq } from 'ramda'
import { newId } from '~shared/codecs/idCodec'
import { Node } from '~shared/types/domain/tree'
import { failOn } from '~shared/utils/failOn'

import { validateTree, withTree } from '../services/'
import { ServerApiMethod } from './serverApi'

export const nodeCreate: ServerApiMethod<'nodeCreate'> = ({ respond, email, payload: newNode }) =>
  withTree(
    respond,
    email
  )(root =>
    root.insert(propEq('id', newNode.parentNode), {
      id: newId(),
      name: newNode.name,
      children: [],
      nodeType: newNode.nodeType
    })
  )
    .then(validateTree)
    .then(o => o.node)
    .then(failOn<Node>(isNil, 'Node not found'))

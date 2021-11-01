import { isNil } from 'ramda'
import { TUiDocument } from '~shared/types/domain/document'
import { wrapServerMessage } from '~shared/types/serverMessages'
import { failOn } from '~shared/utils/failOn'
import { field } from '~shared/utils/ramda'

import { User } from '../types/user'
import { collection } from './database'
import { eventMap, serverState } from './serverState'

serverState.on(eventMap.DOCUMENT, (state, { send, userId }) => {
  void collection('users')
    .findOne({ _id: userId })
    .then(failOn<User>(isNil, 'user not found'))
    .then(field('lastDocument'))
    .then(docId =>
      collection('documents')
        .findOne({ _id: docId })
        .then(failOn(isNil, `Document ${docId} not found`))
    )
    .then(wrapServerMessage(TUiDocument))
    .then(send)
})

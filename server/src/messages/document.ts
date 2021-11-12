import { eventMap, getLastDocument, serverState } from '../services'

serverState.on(eventMap.DOCUMENT, (state, { send, email }) => {
  void getLastDocument(email).then(send('DOCUMENT'))
})

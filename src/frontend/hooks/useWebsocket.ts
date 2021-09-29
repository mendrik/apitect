import { createEvent } from 'effector'
import ReconnectingWebSocket from 'reconnecting-websocket'

import { decode } from '../../utils/codecs/decode'
import { ClientMessage, ServerMessage, TServerMessage } from '../../utils/messages'

const waitForSocket = (socket: ReconnectingWebSocket) =>
  new Promise<any>((resolve, reject) => {
    socket.addEventListener('open', resolve)
    socket.addEventListener('error', reject)
  })

export const messageReceived = createEvent<ServerMessage>()

const webSocket = new ReconnectingWebSocket('ws://127.0.0.1:3001')
webSocket.addEventListener('message', event => {
  try {
    const message = decode(TServerMessage)(JSON.parse(event.data))
    messageReceived(message)
  } catch (e) {
    console.error(e)
  }
})

export const useWebsocket = () => {
  if (webSocket.readyState !== WebSocket.OPEN) {
    throw waitForSocket(webSocket)
  }

  return {
    send: (payload: ClientMessage) => webSocket.send(JSON.stringify(payload))
  }
}

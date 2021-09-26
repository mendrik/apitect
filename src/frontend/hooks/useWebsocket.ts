import { createEvent } from 'effector'
import ReconnectingWebSocket from 'reconnecting-websocket'

import { decode } from '../../utils/codecs/decode'
import { Message, TMessage } from '../types/message'

const waitForSocket = (socket: ReconnectingWebSocket) =>
  new Promise<any>((resolve, reject) => {
    socket.addEventListener('open', resolve)
    socket.addEventListener('error', reject)
  })

export const messageReceived = createEvent<Message>()

const webSocket = new ReconnectingWebSocket('ws://127.0.0.1:3001')
webSocket.addEventListener('message', event => {
  const message = decode(TMessage)(JSON.parse(event.data))
  messageReceived(message)
})

export const useWebsocket = () => {
  if (webSocket.readyState !== WebSocket.OPEN) {
    throw waitForSocket(webSocket)
  }

  return {
    send: <T>(payload: T) => webSocket.send(JSON.stringify(payload))
  }
}

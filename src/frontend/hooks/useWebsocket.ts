import ReconnectingWebSocket from 'reconnecting-websocket'
import { useMemo } from 'react'
import { createEvent } from 'effector'
import { Message } from '../types/message'

const waitForSocket = (socket: ReconnectingWebSocket) =>
  new Promise<any>((resolve, reject) => {
    socket.addEventListener('open', resolve)
    socket.addEventListener('error', reject)
  })

export const messageReceived = createEvent<Message>()

export const useWebsocket = () => {
  const socket = useMemo(() => {
    const rws = new ReconnectingWebSocket('ws://localhost:3000', undefined, { debug: true })
    rws.addEventListener('message', event => messageReceived(JSON.parse(event.data)))
    return rws
  }, [])

  if (socket.readyState !== socket.OPEN) {
    throw waitForSocket(socket)
  }

  return {
    send: <T>(payload: T) => socket.send(JSON.stringify(payload))
  }
}

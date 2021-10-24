import React, { createContext, FC, useCallback, useContext, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import { messageReceived } from '../events/messages'
import { userContext } from './user'
import { ClientMessage } from '@shared/types/messages'

type SocketContext = {
  send: (data: ClientMessage) => void
}

export const socketContext = createContext<SocketContext>({ send: () => 0 })

export const WithSocket: FC = ({ children }) => {
  const { jwt } = useContext(userContext)
  const { sendJsonMessage, readyState, lastMessage } = useWebSocket('ws://127.0.0.1:3001', {
    protocols: jwt!
  })

  useEffect(() => {
    if (lastMessage?.data) {
      messageReceived(JSON.parse(lastMessage?.data))
    }
  }, [lastMessage])

  const send = useCallback(data => (jwt ? sendJsonMessage(data) : void 0), [jwt, sendJsonMessage])
  return readyState === ReadyState.OPEN ? (
    <socketContext.Provider value={{ send }}>{children}</socketContext.Provider>
  ) : null
}

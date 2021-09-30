import React, { createContext, FC, useContext } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import { ClientMessage } from '../../shared/types/messages'
import { userContext } from './user'

type SocketContext = {
  send: (data: ClientMessage) => void
}

export const socketContext = createContext<SocketContext>({ send: () => 0 })

export const WithSocket: FC = ({ children }) => {
  const { jwt } = useContext(userContext)
  const { sendJsonMessage, readyState } = useWebSocket('ws://127.0.0.1:3001', {
    protocols: jwt!
  })

  return readyState === ReadyState.OPEN ? (
    <socketContext.Provider
      value={{
        send: data => (jwt ? sendJsonMessage(data) : void 0)
      }}
    >
      {children}
    </socketContext.Provider>
  ) : null
}

import React, { createContext, FC, useContext, useEffect, useRef } from 'react'

import { decode } from '../../shared/codecs/decode'
import { Maybe } from '../../shared/types/generic'
import { ClientMessage, TServerMessage } from '../../shared/types/messages'
import { messageReceived } from '../events/messages'
import { userContext } from './user'

type SocketContext = {
  send: (data: ClientMessage) => void
}

export const socketContext = createContext<SocketContext>({ send: () => 0 })

export const WithSocket: FC = ({ children }) => {
  const { jwt } = useContext(userContext)
  const socket = useRef<Maybe<WebSocket>>()
  // const [socketState, setSocketState] = useState<WebSocket>()

  useEffect(() => {
    if (jwt != null) {
      const ws: WebSocket = new WebSocket('ws://127.0.0.1:3001', jwt)
      Object.defineProperty(ws, 'readyState', {
        value(v: number) {
          console.log(v)
        }
      })

      ws.addEventListener('message', event => {
        try {
          const message = decode(TServerMessage)(JSON.parse(event.data))
          messageReceived(message)
        } catch (e) {
          console.error(e)
        }
      })
      return () => ws.close()
    }
    return void 0
  }, [jwt])

  return (
    socket && (
      <socketContext.Provider
        value={{
          send: data => console.log(data)
        }}
      >
        {children}
      </socketContext.Provider>
    )
  )
}

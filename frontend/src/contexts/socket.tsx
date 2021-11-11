import React, { FC, useContext, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import { messageReceived, socketEstablished } from '../events/messages'
import { logger } from '../shared/utils/logger'
import { userContext } from './user'

export const WithSocket: FC = ({ children }) => {
  const { jwt } = useContext(userContext)
  const { sendJsonMessage, readyState, lastMessage } = useWebSocket('ws://127.0.0.1:3001', {
    protocols: jwt!
  })

  useEffect(() => void socketEstablished(sendJsonMessage), [])

  useEffect(() => {
    if (lastMessage?.data) {
      try {
        messageReceived(JSON.parse(lastMessage?.data))
      } catch (e) {
        logger.error('Failed to parse server message:', lastMessage?.data)
      }
    }
  }, [lastMessage])

  return readyState === ReadyState.OPEN ? <>{children}</> : null
}

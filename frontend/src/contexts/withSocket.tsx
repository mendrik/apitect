import React, { useContext, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import { apiResponse, socketEstablished } from '../events/messages'
import { Jsx } from '../shared/types/generic'
import { logger } from '../shared/utils/logger'
import { userContext } from './withUser'

export const WithSocket = ({ children }: Jsx) => {
  const { jwt } = useContext(userContext)
  const { sendJsonMessage, readyState, lastMessage } = useWebSocket('ws://127.0.0.1:3001', {
    protocols: jwt!
  })

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      void socketEstablished(sendJsonMessage)
    }
  }, [readyState])

  useEffect(() => {
    if (lastMessage?.data) {
      try {
        apiResponse(JSON.parse(lastMessage?.data))
      } catch (e) {
        logger.error('Failed to parse server message:', lastMessage?.data)
      }
    }
  }, [lastMessage])

  return readyState === ReadyState.OPEN ? <>{children}</> : null
}

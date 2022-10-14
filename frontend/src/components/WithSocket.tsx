import { isNotNilOrEmpty } from 'ramda-adjunct'
import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { Jsx } from '~shared/types/generic'
import { logger } from '~shared/utils/logger'

import { apiResponse, socketEstablished } from '../events/messages'

export const WithSocket = ({ children }: Jsx) => {
  const [jwt] = useLocalStorage<string>('jwt')
  const { sendJsonMessage, readyState, lastMessage } = useWebSocket('ws://127.0.0.1:3001', {
    protocols: jwt,
    reconnectAttempts: 3,
    retryOnError: true
  })

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      void socketEstablished(sendJsonMessage)
    }
  }, [readyState, socketEstablished, sendJsonMessage])

  useEffect(() => {
    if (isNotNilOrEmpty(lastMessage?.data)) {
      try {
        apiResponse(JSON.parse(lastMessage?.data))
      } catch (e) {
        logger.error('Failed to parse server message:', lastMessage?.data)
      }
    }
  }, [lastMessage, apiResponse])

  return readyState === ReadyState.OPEN ? <>{children}</> : null
}

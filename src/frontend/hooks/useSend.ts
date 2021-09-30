import { useEffect } from 'react'

import { ClientMessage } from '../../shared/types/messages'
import { useWebsocket } from './useWebsocket'

export const useSend = (data: ClientMessage): void => {
  const { send } = useWebsocket()
  useEffect(() => send({ ...data }), [send, data])
}

import { useEffect } from 'react'

import { ClientMessage } from '../../shared/types/messages'
import { useWebsocket } from './useWebsocket'

export const useSend = (data: Omit<ClientMessage, 'jwt'>): void => {
  const { send } = useWebsocket()
  const jwt = localStorage.getItem('jwt')
  useEffect(() => (jwt ? send({ ...data, jwt }) : void 0), [send, data, jwt])
}

import { useEffect } from 'react'

import { ClientMessage } from '../../utils/messages'
import { useWebsocket } from './useWebsocket'

export const useSend = (data: Omit<ClientMessage, 'jwt'>): void => {
  const { send } = useWebsocket()
  const jwt = localStorage.getItem('jwt')
  if (jwt == null) {
    throw Error('Unauthorized sending')
  }
  useEffect(() => send({ ...data, jwt }))
}

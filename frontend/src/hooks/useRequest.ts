import { useContext, useEffect } from 'react'

import { socketContext } from '../contexts/socket'
import { ClientMessage } from '../shared/types/clientMessages'

export const useRequest = (message: ClientMessage) => {
  const { send } = useContext(socketContext)

  useEffect(() => {
    send(message)
  }, [send])
}

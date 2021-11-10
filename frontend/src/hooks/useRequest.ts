import { useStore } from 'effector-react'
import { useEffect } from 'react'

import { ClientMessage } from '../shared/types/clientMessages'
import $appStore from '../stores/$appStore'

export const useRequest = (message: ClientMessage) => {
  const { sendMessage } = useStore($appStore)

  useEffect(() => {
    sendMessage(message)
  }, [])
}

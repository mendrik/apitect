import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { useRequireLogin } from '../hooks/useRequireLogin'
import { useWebsocket } from '../hooks/useWebsocket'
import appState from '../stores/appState'

const App: FC = () => {
  useRequireLogin()
  const { t } = useTranslation()
  const { send } = useWebsocket()
  const test = useStore(appState)

  console.log(test, send, t)

  return <div>My App</div>
}

export default App

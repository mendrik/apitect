import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from 'effector-react'

import { useWebsocket } from '../hooks/useWebsocket'
import appState from '../stores/appState'

const App: FC = () => {
  const { t } = useTranslation()
  const { send } = useWebsocket()
  const test = useStore(appState)
  return (
    <button type="button" onClick={() => send({ type: 'Hi' })}>
      {t('app.name')} {test.click}
    </button>
  )
}

export default App

import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { useWebsocket } from '../hooks/useWebsocket'
import appState from '../stores/appState'

const App: FC = () => {
  const { t } = useTranslation()
  const { send } = useWebsocket()
  const test = useStore(appState)
  console.log(test)
  return (
    <div className="p-3">
      <button type="button" className="btn btn-primary" onClick={() => send({ type: 'Hi' })}>
        {t('app.name')}
      </button>
    </div>
  )
}

export default App

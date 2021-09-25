import React, { FC } from 'react'

import { Tab } from '../forms/Tab'
import { Tabs } from '../forms/Tabs'
import { LoginForm } from './LoginForm'

export const Authenticate: FC = () => {
  return (
    <div className="modal-dialog modal-dialog-centered">
      <Tabs className="min-w-modal">
        <Tab title="app.login">
          <LoginForm />
        </Tab>
        <Tab title="app.register">B</Tab>
      </Tabs>
    </div>
  )
}

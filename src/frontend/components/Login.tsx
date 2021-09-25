import React, { FC } from 'react'

import { Tab } from '../forms/Tab'
import { Tabs } from '../forms/Tabs'
import { LoginForm } from './LoginForm'

export const Login: FC = () => {
  return (
    <div className="d-flex flex-column justify-content-md-center align-items-center vh-100 p-4">
      <Tabs className="min-w-modal">
        <Tab title="app.login">
          <LoginForm />
        </Tab>
        <Tab title="app.register">B</Tab>
      </Tabs>
    </div>
  )
}

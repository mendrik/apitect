import React, { FC } from 'react'

import { Tab } from '../forms/Tab'
import { Tabs } from '../forms/Tabs'
import { LoginForm } from './LoginForm'

export const Login: FC = () => {
  return (
    <Tabs>
      <Tab title="app.login">
        <LoginForm />
      </Tab>
      <Tab title="app.register">B</Tab>
    </Tabs>
  )
}

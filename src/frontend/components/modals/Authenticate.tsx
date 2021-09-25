import React, { FC } from 'react'

import { Tab } from '../../forms/Tab'
import { Tabs } from '../../forms/Tabs'
import { LoginForm } from '../forms/LoginForm'

const Authenticate: FC = () => {
  return (
    <div>
      <Tabs className="w-100">
        <Tab title="app.login">
          <LoginForm />
        </Tab>
        <Tab title="app.register">B</Tab>
      </Tabs>
    </div>
  )
}

export default Authenticate

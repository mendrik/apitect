import React, { FC } from 'react'

import { Tab } from '../../forms/Tab'
import { Tabs } from '../../forms/Tabs'
import { LoginForm } from '../forms/LoginForm'
import { RegisterForm } from '../forms/RegisterForm'

const Authenticate: FC = () => {
  return (
    <div>
      <Tabs className="w-100">
        <Tab title="modals.authenticate.login.title">
          <LoginForm />
        </Tab>
        <Tab title="modals.authenticate.register.title">
          <RegisterForm />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Authenticate

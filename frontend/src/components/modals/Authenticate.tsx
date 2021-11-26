import React from 'react'

import { LoginForm } from '../../forms/LoginForm'
import { RegisterForm } from '../../forms/RegisterForm'
import { ModalFC } from '../ModalStub'
import { Tab } from '../forms/Tab'
import { Tabs } from '../forms/Tabs'

const Authenticate: ModalFC = ({ close }) => (
  <div>
    <Tabs className="w-100">
      <Tab title="modals.authenticate.login.title">
        <LoginForm close={close} />
      </Tab>
      <Tab title="modals.authenticate.register.title">
        <RegisterForm close={close} />
      </Tab>
    </Tabs>
  </div>
)

export default Authenticate

import { Tab } from '~forms/Tab'
import { Tabs } from '~forms/Tabs'

import { clearApiError } from '../../events/api'
import { LoginForm } from '../../forms/LoginForm'
import { RegisterForm } from '../../forms/RegisterForm'

const Authenticate = () => (
  <Tabs className="w-100" onTabClick={() => clearApiError()}>
    <Tab title="modals.authenticate.login.title">
      <LoginForm />
    </Tab>
    <Tab title="modals.authenticate.register.title">
      <RegisterForm />
    </Tab>
  </Tabs>
)

export default Authenticate

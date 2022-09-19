import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from 'effector-react'
import { prop } from 'ramda'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from 'react-use'
import { ButtonRow } from '~forms/ButtonRow'
import { Form } from '~forms/Form'
import { GenericError } from '~forms/GenericError'
import { SubmitButton } from '~forms/SubmitButton'
import { TextInput } from '~forms/TextInput'
import { useView } from '~hooks/useView'
import { Login, ZLogin } from '~shared/types/forms/login'
import { Fn } from '~shared/types/generic'

import ForgotPasswordForm from '../components/modals/ForgotPasswordForm'
import { $apiError, apiFx } from '../events/api'
import { whoAmIFx } from '../events/user'
import { login } from '../utils/restApi'

type OwnProps = {
  close: Fn
}

enum Views {
  Login,
  ForgotPassword
}

export const LoginForm = ({ close }: OwnProps) => {
  const { t } = useTranslation()
  const { view, loginView, forgotPasswordView } = useView(Views)
  const error = useStore($apiError)
  const running = useStore(apiFx.pending)

  const form = useForm<Login>({
    resolver: zodResolver(ZLogin),
    defaultValues: {
      email: 'andreas@mindmine.fi',
      password: 'qctxExmNQ9FEcZ'
    }
  })

  const [, setJwt] = useLocalStorage('jwt')

  const trigger = (data: Login) =>
    apiFx(() => login(data))
      .then(prop('token'))
      .then(setJwt)
      .then(whoAmIFx)
      .then(close)

  if (view === Views.ForgotPassword) {
    return <ForgotPasswordForm close={loginView} />
  }

  return (
    <Form form={form} onSubmit={trigger} running={running}>
      <TextInput name="email" label="form.fields.email" type="email" containerClasses="mb-3" />
      <TextInput
        name="password"
        label="form.fields.password"
        type="password"
        containerClasses="mb-3"
      />
      <GenericError error={error} />
      <ButtonRow>
        <Button onClick={forgotPasswordView} variant="outline-primary">
          {t('modals.authenticate.login.forgotPassword')}
        </Button>
        <SubmitButton localeKey="modals.authenticate.login.submit" />
      </ButtonRow>
    </Form>
  )
}

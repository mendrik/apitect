import { zodResolver } from '@hookform/resolvers/zod'
import { prop } from 'ramda'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from 'react-use'
import { Login, ZLogin } from 'shared/types/forms/login'
import { Fn, Jsx } from 'shared/types/generic'

import { ButtonRow } from '../components/forms/ButtonRow'
import { Form } from '../components/forms/Form'
import { GenericError } from '../components/forms/GenericError'
import { SubmitButton } from '../components/forms/SubmitButton'
import { TextInput } from '../components/forms/TextInput'
import ForgotPasswordForm from '../components/modals/ForgotPasswordForm'
import { whoAmIFx } from '../events/user'
import useProgress from '../hooks/useProgress'
import { usePromise } from '../hooks/usePromise'
import { useView } from '../hooks/useView'
import { Token } from '../shared/types/response/token'
import { login } from '../utils/restApi'

type OwnProps = {
  close: Fn
}

enum Views {
  Login,
  ForgotPassword
}

export const LoginForm = ({ close }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const { view, loginView, forgotPasswordView } = useView(Views)

  const form = useForm<Login>({
    resolver: zodResolver(ZLogin),
    defaultValues: {
      email: 'andreas@mindmine.fi',
      password: 'qctxExmNQ9FEcZ'
    }
  })

  const [withProgress, status] = useProgress<Token>()
  const [, setJwt] = useLocalStorage('jwt')

  const trigger = usePromise<Login>(data =>
    withProgress(login(data)).then(prop('token')).then(setJwt).then(whoAmIFx).then(close)
  )

  if (view === Views.ForgotPassword) {
    return <ForgotPasswordForm close={loginView} />
  }

  return (
    <Form form={form} onSubmit={trigger} status={status}>
      <TextInput name="email" label="form.fields.email" type="email" containerClassNames="mb-3" />
      <TextInput
        name="password"
        label="form.fields.password"
        type="password"
        containerClassNames="mb-3"
      />
      <GenericError />
      <ButtonRow>
        <Button onClick={forgotPasswordView} variant="outline-primary">
          {t('modals.authenticate.login.forgotPassword')}
        </Button>
        <SubmitButton localeKey="modals.authenticate.login.submit" />
      </ButtonRow>
    </Form>
  )
}

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Login, ZLogin } from 'shared/types/forms/login'
import { Fn, Jsx } from 'shared/types/generic'

import { ButtonRow } from '../components/forms/ButtonRow'
import { Form } from '../components/forms/Form'
import { GenericError } from '../components/forms/GenericError'
import { SubmitButton } from '../components/forms/SubmitButton'
import { TextInput } from '../components/forms/TextInput'
import ForgotPasswordForm from '../components/modals/ForgotPasswordForm'
import { userContext } from '../contexts/withUser'
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
  const { trigger } = usePromise<Login>(data => withProgress(login(data)).then(setJwt))

  const { setJwt, user } = useContext(userContext)
  useEffect(() => (user != null ? close() : void 0), [user, close])

  if (view === Views.ForgotPassword) {
    return <ForgotPasswordForm close={loginView} />
  }

  return (
    <Form form={form} trigger={trigger} status={status}>
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

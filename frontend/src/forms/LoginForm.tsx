import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Login, ZLogin } from 'shared/types/forms/login'
import { Fn, Jsx } from 'shared/types/generic'
import { match } from 'ts-pattern'

import { ButtonRow } from '../components/forms/ButtonRow'
import { Form } from '../components/forms/Form'
import { GenericError } from '../components/forms/GenericError'
import { SubmitButton } from '../components/forms/SubmitButton'
import { TextInput } from '../components/forms/TextInput'
import ForgotPasswordForm from '../components/modals/ForgotPasswordForm'
import { userContext } from '../contexts/withUser'
import usePromise from '../hooks/usePromise'
import { useServerError } from '../hooks/useServerError'
import { login } from '../utils/restApi'

type OwnProps = {
  close: Fn
}

enum Views {
  LOGIN,
  FORGOT_PASSWORD
}

export const LoginForm = ({ close }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const [view, setView] = useState<Views>(Views.LOGIN)
  const form = useForm<Login>({
    resolver: zodResolver(ZLogin),
    defaultValues: {
      email: 'andreas@mindmine.fi',
      password: 'qctxExmNQ9FEcZ'
    }
  })
  const submit = usePromise('doLogin', login)
  useServerError(submit.error, form.setError)
  const { setJwt, user } = useContext(userContext)
  useEffect(() => (user != null ? close() : void 0), [user, close])

  return match(view)
    .with(Views.FORGOT_PASSWORD, () => <ForgotPasswordForm close={() => setView(Views.LOGIN)} />)
    .otherwise(() => (
      <Form form={form} state={submit} onSuccess={setJwt}>
        <TextInput name="email" label="form.fields.email" type="email" containerClassNames="mb-3" />
        <TextInput
          name="password"
          label="form.fields.password"
          type="password"
          containerClassNames="mb-3"
        />
        <GenericError />
        <ButtonRow>
          <Button onClick={() => setView(Views.FORGOT_PASSWORD)} variant="outline-primary">
            {t('modals.authenticate.login.forgotPassword')}
          </Button>
          <SubmitButton localeKey="modals.authenticate.login.submit" />
        </ButtonRow>
      </Form>
    ))
}

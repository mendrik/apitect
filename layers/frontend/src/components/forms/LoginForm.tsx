import { ioTsResolver } from '@hookform/resolvers/io-ts'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { match } from 'ts-pattern'
import { Login, TLogin } from '~shared/types/forms/login'
import { Fn } from '~shared/types/generic'

import { userContext } from '../../contexts/user'
import { ButtonRow } from '../../forms/ButtonRow'
import { Form } from '../../forms/Form'
import { GenericError } from '../../forms/GenericError'
import { SubmitButton } from '../../forms/SubmitButton'
import { TextInput } from '../../forms/TextInput'
import usePromise from '../../hooks/usePromise'
import { useServerError } from '../../hooks/useServerError'
import { login } from '../../utils/api'
import ForgotPasswordForm from '../modals/ForgotPasswordForm'

type OwnProps = {
  close: Fn
}

enum Views {
  LOGIN,
  FORGOT_PASSWORD
}

export const LoginForm: FC<OwnProps> = ({ close }) => {
  const { t } = useTranslation()
  const [view, setView] = useState<Views>(Views.LOGIN)
  const form = useForm<Login>({
    resolver: ioTsResolver(TLogin),
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
      <Form form={form} state={submit} success={setJwt}>
        <TextInput
          name="email"
          label="form.fields.email"
          type="email"
          options={{ required: true }}
        />
        <TextInput
          name="password"
          label="form.fields.password"
          type="password"
          options={{ required: true }}
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

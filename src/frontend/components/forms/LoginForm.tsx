import { ioTsResolver } from '@hookform/resolvers/io-ts'
import React, { FC, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Fn } from '../../../shared/types/generic'
import { Login, TLogin } from '../../../shared/types/login'
import { userContext } from '../../contexts/user'
import { ButtonRow } from '../../forms/ButtonRow'
import { Form } from '../../forms/Form'
import { GenericError } from '../../forms/GenericError'
import { SubmitButton } from '../../forms/SubmitButton'
import { TextInput } from '../../forms/TextInput'
import usePromise from '../../hooks/usePromise'
import { useServerError } from '../../hooks/useServerError'
import { login } from '../../utils/api'
import { ModalLink } from '../modals/ModalLink'

type OwnProps = {
  close: Fn
}

export const LoginForm: FC<OwnProps> = ({ close }) => {
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

  return (
    <Form form={form} state={submit} success={setJwt}>
      <TextInput name="email" label="form.fields.email" type="email" options={{ required: true }} />
      <TextInput
        name="password"
        label="form.fields.password"
        type="password"
        options={{ required: true }}
      />
      <GenericError />
      <ButtonRow>
        <SubmitButton localeKey="modals.authenticate.login.submit" />
      </ButtonRow>
      <p className="my-4">
        <ModalLink modal="forgot-password">Forgot password?</ModalLink>
      </p>
    </Form>
  )
}

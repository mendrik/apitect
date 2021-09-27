import { ioTsResolver } from '@hookform/resolvers/io-ts'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Login, TLogin } from '../../../backend/types/login'
import { Fn } from '../../../utils/types'
import { Form } from '../../forms/Form'
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
      password: 'intershop1'
    }
  })
  const { t } = useTranslation()
  const submit = usePromise('doLogin', login)
  useServerError(submit.error, form.setError)

  return (
    <Form form={form} state={submit} success={close}>
      <TextInput name="email" label="form.fields.email" type="email" options={{ required: true }} />
      <TextInput
        name="password"
        label="form.fields.password"
        type="password"
        options={{ required: true }}
      />
      <button type="submit" className="btn btn-primary btn-block">
        {t('modals.authenticate.login.submit')}
      </button>
      <p className="my-4">
        <ModalLink modal="forgot-password">Forgot password?</ModalLink>
      </p>
    </Form>
  )
}

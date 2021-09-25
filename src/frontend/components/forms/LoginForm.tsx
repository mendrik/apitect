import { ioTsResolver } from '@hookform/resolvers/io-ts'
import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Login, TLogin } from '../../../backend/types/login'
import { TextInput } from '../../forms/TextInput'
import usePromise from '../../hooks/usePromise'
import { login } from '../../utils/api'
import { ModalLink } from '../modals/ModalLink'

export const LoginForm: FC = () => {
  const form = useForm<Login>({
    resolver: ioTsResolver(TLogin)
  })
  const { trigger } = usePromise('doLogin', login)

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(trigger)} noValidate>
        <TextInput name="email" label="form.login.email" />
        <TextInput name="password" label="form.login.password" type="password" />
        <button type="submit" className="btn btn-primary btn-block">
          Sign in
        </button>
      </form>
      <p className="my-4">
        <ModalLink modal="forgot-password">Forgot password?</ModalLink>
      </p>
    </FormProvider>
  )
}

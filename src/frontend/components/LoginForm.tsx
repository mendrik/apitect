import { ioTsResolver } from '@hookform/resolvers/io-ts'
import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Login, TLogin } from '../../backend/types/login'
import { Checkbox } from '../forms/Checkbox'
import { TextInput } from '../forms/TextInput'
import usePromise from '../hooks/usePromise'
import { login } from '../utils/api'

export const LoginForm: FC = () => {
  const form = useForm<Login>({
    resolver: ioTsResolver(TLogin)
  })
  const { trigger } = usePromise('doLogin', data => login(data))

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(trigger)} noValidate>
        <TextInput name="email" label="form.login.email" />
        <TextInput name="email" label="form.login.password" type="password" />
        <div className="d-flex justify-content-around align-items-center mb-4">
          <Checkbox name="rememberMe" label="form.login.rememberMe" />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Sign in
        </button>
      </form>
      <p className="my-4">
        <a href="#!">Forgot password?</a>
      </p>
    </FormProvider>
  )
}

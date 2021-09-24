import { ioTsResolver } from '@hookform/resolvers/io-ts'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Login, TLogin } from '../../backend/types/login'
import { Checkbox } from '../forms/Checkbox'
import { TextInput } from '../forms/TextInput'
import { usePromise } from '../hooks/usePromise'
import { useWebsocket } from '../hooks/useWebsocket'
import appState from '../stores/appState'

const App: FC = () => {
  const { t } = useTranslation()
  const { send } = useWebsocket()
  const test = useStore(appState)
  const form = useForm<Login>({
    resolver: ioTsResolver(TLogin)
  })

  const [handleSubmit] = usePromise(() => Promise.resolve(0))

  console.log(test, send, t)

  return (
    <FormProvider {...form}>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">Image goes here</div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
                <TextInput name="email" label="form.login.email" />
                <TextInput name="email" label="form.login.password" type="password" />
                <div className="d-flex justify-content-around align-items-center mb-4">
                  <Checkbox name="rememberMe" label="form.login.rememberMe" />
                  <a href="#!">Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </FormProvider>
  )
}

export default App

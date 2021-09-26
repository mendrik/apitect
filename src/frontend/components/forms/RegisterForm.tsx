import { ioTsResolver } from '@hookform/resolvers/io-ts'
import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Register, TRegister } from '../../../backend/types/register'
import { TextInput } from '../../forms/TextInput'
import usePromise from '../../hooks/usePromise'
import { useServerError } from '../../hooks/useServerError'
import { register } from '../../utils/api'

export const RegisterForm: FC = () => {
  const form = useForm<Register>({
    resolver: ioTsResolver(TRegister)
  })
  const { t } = useTranslation()
  const { trigger, error } = usePromise('doRegister', register)
  useServerError(error, form.setError)

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(trigger)} noValidate>
        <TextInput name="name" label="form.fields.name" options={{ required: true }} />
        <TextInput name="email" label="form.fields.email" options={{ required: true }} />
        <TextInput
          name="password"
          label="form.fields.password"
          type="password"
          options={{ required: true }}
        />
        <TextInput
          name="passwordRepeat"
          label="form.fields.passwordRepeat"
          type="password"
          options={{ required: true }}
        />
        <button type="submit" className="btn btn-primary btn-block">
          {t('modals.authenticate.register.submit')}
        </button>
      </form>
    </FormProvider>
  )
}

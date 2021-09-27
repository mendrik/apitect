import React, { FC, useEffect } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import { Fn } from '../../utils/types'
import { State } from '../hooks/usePromise'
import { useServerError } from '../hooks/useServerError'

type OwnProps<T> = {
  form: UseFormReturn<T>
  state: State<any>
  success?: Fn
  successView?: FC
}

export const Form: FC<OwnProps<any>> = ({
  form,
  successView: SuccessView,
  success,
  state,
  children
}) => {
  useServerError(state.error, form.setError)

  useEffect(() => {
    if (success != null && state.status === 'done') {
      success()
    }
  }, [state.status, success])

  return state.status === 'done' && SuccessView != null ? (
    <SuccessView />
  ) : (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(state.trigger)} noValidate>
        {children}
      </form>
    </FormProvider>
  )
}

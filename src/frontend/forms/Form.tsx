import React, { createContext, FC, useEffect } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import { Fn, Maybe } from '../../shared/types/generic'
import { State } from '../hooks/usePromise'
import { useServerError } from '../hooks/useServerError'

type OwnProps<T> = {
  form: UseFormReturn<T>
  state: State<any>
  success?: Fn
  successView?: JSX.Element
}
type FormWrappingContext = {
  promise: string
  error: Maybe<Error>
}
export const formWrappingContext = createContext<FormWrappingContext>({
  promise: '',
  error: undefined
})

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
      success(state.data)
    }
  }, [state, success])

  return state.status === 'done' && SuccessView != null ? (
    SuccessView
  ) : (
    <formWrappingContext.Provider value={{ promise: state.name, error: state.error }}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(state.trigger)} noValidate>
          {children}
        </form>
      </FormProvider>
    </formWrappingContext.Provider>
  )
}

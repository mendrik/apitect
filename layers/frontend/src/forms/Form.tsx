import { identity } from 'ramda'
import React, { createContext, FC } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import { ExtendedError, State } from '../hooks/usePromise'
import { useServerError } from '../hooks/useServerError'
import { Fn, Maybe } from '@shared/types/generic'

type OwnProps<T> = {
  form: UseFormReturn<T>
  state: State<any>
  success?: Fn
  successView?: JSX.Element
}

type FormWrappingContext = {
  promise: string
  error: Maybe<ExtendedError>
}

export const formWrappingContext = createContext<FormWrappingContext>({
  promise: '',
  error: undefined
})

export const Form: FC<OwnProps<any>> = ({
  form,
  successView: SuccessView,
  success = identity,
  state,
  children
}) => {
  useServerError(state.error, form.setError)

  return state.status === 'done' && SuccessView != null ? (
    SuccessView
  ) : (
    <formWrappingContext.Provider value={{ promise: state.name, error: state.error }}>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((...args) => state.trigger(...args).then(success))}
          noValidate
        >
          {children}
        </form>
      </FormProvider>
    </formWrappingContext.Provider>
  )
}

import { identity } from 'ramda'
import React, { createContext } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { Fn, Jsx, Maybe } from 'shared/types/generic'

import { ExtendedError, State } from '../hooks/usePromise'
import { useServerError } from '../hooks/useServerError'

type OwnProps<T> = {
  form: UseFormReturn<T>
  state: State<any>
  onSuccess?: Fn
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

export const Form = <T extends FieldValues>({
  form,
  successView: SuccessView,
  onSuccess = identity,
  state,
  children
}: Jsx<OwnProps<T>>) => {
  useServerError(state.error, form.setError)
  return state.status === 'done' && SuccessView != null ? (
    SuccessView
  ) : (
    <formWrappingContext.Provider value={{ promise: state.name, error: state.error }}>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((...args) => state.trigger(...args).then(onSuccess))}
          noValidate
        >
          {children}
        </form>
      </FormProvider>
    </formWrappingContext.Provider>
  )
}

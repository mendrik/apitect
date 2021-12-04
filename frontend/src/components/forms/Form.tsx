import React from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { Fn, Jsx } from '~shared/types/generic'

import { Status } from '../../hooks/useProgress'
import { useServerError } from '../../hooks/useServerError'

type OwnProps<T, S = any> = {
  form: UseFormReturn<T>
  onSubmit: Fn
  status?: Status<S>
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  status,
  children
}: Jsx<OwnProps<T>>) => {
  useServerError(form.setError)
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        data-disabled={status?.is === 'running' ? 'true' : 'false'}
      >
        {children}
      </form>
    </FormProvider>
  )
}

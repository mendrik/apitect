import React from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { useServerError } from '~hooks/useServerError'
import { Fn, Jsx } from '~shared/types/generic'

type OwnProps<T extends FieldValues, S = any> = {
  form: UseFormReturn<T>
  onSubmit: Fn
  running: boolean
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  running = false,
  children
}: Jsx<OwnProps<T>>) => {
  useServerError(form.setError)
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        data-disabled={running ? 'true' : 'false'}
      >
        {children}
      </form>
    </FormProvider>
  )
}

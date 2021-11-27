import React from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { Fn, Jsx } from 'shared/types/generic'

import { Status } from '../../hooks/useProgress'

type OwnProps<T, S = any> = {
  form: UseFormReturn<T>
  trigger: Fn
  status?: Status<S>
}

export const Form = <T extends FieldValues>({
  form,
  trigger,
  status,
  children
}: Jsx<OwnProps<T>>) => (
  <FormProvider {...form}>
    <form
      onSubmit={form.handleSubmit(trigger)}
      noValidate
      data-disabled={status?.status === 'running'}
    >
      {children}
    </form>
  </FormProvider>
)

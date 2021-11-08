import React, { FC } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { Fn } from 'shared/types/generic'

type OwnProps<T> = {
  form: UseFormReturn<T>
  onValid: Fn
}

export const SocketForm: FC<OwnProps<any>> = ({ onValid, form, children }) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onValid)} noValidate>
        {children}
      </form>
    </FormProvider>
  )
}

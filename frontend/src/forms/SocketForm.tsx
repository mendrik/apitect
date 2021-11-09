import React, { PropsWithChildren, ReactElement } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { UnpackNestedValue } from 'react-hook-form/dist/types/form'

type OwnProps<T> = {
  form: UseFormReturn<T>
  onValid: (data: UnpackNestedValue<T>) => void
}

export const SocketForm = <T extends FieldValues>({
  onValid,
  form,
  children
}: PropsWithChildren<OwnProps<T>>): ReactElement | null => {
  return (
    <FormProvider<T> {...form}>
      <form onSubmit={form.handleSubmit(onValid)} noValidate>
        {children}
      </form>
    </FormProvider>
  )
}

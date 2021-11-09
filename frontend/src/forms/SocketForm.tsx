import { useStore } from 'effector-react'
import React, { PropsWithChildren, ReactElement } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import { ClientMessage } from '../shared/types/clientMessages'
import { Fn } from '../shared/types/generic'
import $appStore from '../stores/$appStore'

type FormData<T extends ClientMessage['type']> = Omit<Extract<ClientMessage, { type: T }>, 'type'>

type OwnProps<T extends ClientMessage['type']> = {
  submitMessage: T
  form: UseFormReturn<FormData<T>>
  onSuccess?: Fn
}

export const SocketForm = <T extends ClientMessage['type']>({
  submitMessage,
  form,
  children,
  onSuccess
}: PropsWithChildren<OwnProps<T>>): ReactElement | null => {
  const { sendJsonMessage } = useStore($appStore)

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(data => {
          sendJsonMessage({ type: submitMessage, ...data })
          void onSuccess?.(data)
        })}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  )
}

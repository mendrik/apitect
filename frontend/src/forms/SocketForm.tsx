import React, { PropsWithChildren, ReactElement, useContext } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import { socketContext } from '../contexts/socket'
import { ClientMessage } from '../shared/types/clientMessages'

type FormData<T extends ClientMessage['type']> = Omit<Extract<ClientMessage, { type: T }>, 'type'>

type OwnProps<T extends ClientMessage['type']> = {
  submitMessage: T
  form: UseFormReturn<FormData<T>>
}

export const SocketForm = <T extends ClientMessage['type']>({
  submitMessage,
  form,
  children
}: PropsWithChildren<OwnProps<T>>): ReactElement | null => {
  const { send } = useContext(socketContext)

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(data => {
          console.log(data)
          send({ type: submitMessage, ...data } as ClientMessage)
        })}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  )
}

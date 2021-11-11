import { useStore } from 'effector-react'
import React, { PropsWithChildren, ReactElement } from 'react'
import { Button } from 'react-bootstrap'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { decode } from '../shared/codecs/decode'
import { ClientMessage, TClientMessage } from '../shared/types/clientMessages'
import { Fn } from '../shared/types/generic'
import $appStore from '../stores/$appStore'
import { ButtonRow } from './ButtonRow'
import { SubmitButton } from './SubmitButton'

type FormData<T extends ClientMessage['type']> = Omit<Extract<ClientMessage, { type: T }>, 'type'>

type OwnProps<T extends ClientMessage['type']> = {
  submitMessage: T
  form: UseFormReturn<FormData<T>>
  onSuccess?: Fn
  close: Fn
}

export const SocketForm = <T extends ClientMessage['type']>({
  submitMessage,
  form,
  children,
  onSuccess,
  close
}: PropsWithChildren<OwnProps<T>>): ReactElement | null => {
  const { t } = useTranslation()
  const { sendMessage } = useStore($appStore)
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(data => {
          sendMessage(decode(TClientMessage)({ type: submitMessage, ...data }))
          void onSuccess?.(data)
        })}
        noValidate
      >
        {children}
        <ButtonRow className="mt-4">
          <Button variant="outline-secondary" onClick={close}>
            {t('common.cancel')}
          </Button>
          <SubmitButton localeKey="modals.newNode.submit" />
        </ButtonRow>
      </form>
    </FormProvider>
  )
}

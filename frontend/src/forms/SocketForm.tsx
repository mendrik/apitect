import { Effect } from 'effector'
import React, { PropsWithChildren, ReactElement } from 'react'
import { Button } from 'react-bootstrap'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Fn } from '../shared/types/generic'
import { ButtonRow } from './ButtonRow'
import { SubmitButton } from './SubmitButton'

type OwnProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  onValid: Effect<any, any> // todo fix me
  close: Fn
}

export const SocketForm = <T extends FieldValues>({
  form,
  children,
  onValid,
  close
}: PropsWithChildren<OwnProps<T>>): ReactElement | null => {
  const { t } = useTranslation()
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(data => {
          close()
          return onValid(data)
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

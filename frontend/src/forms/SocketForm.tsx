import { EffectByHandler } from 'effector'
import React, { PropsWithChildren, ReactElement } from 'react'
import { Button } from 'react-bootstrap'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Api, FormApiMethod } from '../shared/api'
import { Fn } from '../shared/types/generic'
import { ButtonRow } from './ButtonRow'
import { SubmitButton } from './SubmitButton'

type OwnProps<M extends FormApiMethod> = {
  form: UseFormReturn<any>
  onValid: EffectByHandler<Api[M], Error>
  close: Fn
}

export const SocketForm = <M extends FormApiMethod>({
  form,
  children,
  onValid,
  close
}: PropsWithChildren<OwnProps<M>>): ReactElement | null => {
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

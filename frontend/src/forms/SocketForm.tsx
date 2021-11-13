import { Effect } from 'effector'
import React, { PropsWithChildren, ReactElement } from 'react'
import { Button } from 'react-bootstrap'
import { FormProvider, UnpackNestedValue, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ApiMethod, ApiParam, ApiResult } from '../shared/api'
import { Fn } from '../shared/types/generic'
import { ButtonRow } from './ButtonRow'
import { SubmitButton } from './SubmitButton'

type OwnProps<M extends ApiMethod, T = ApiParam<M>> = {
  form: UseFormReturn<any>
  onValid: Effect<UnpackNestedValue<T>, ApiResult<M>>
  close: Fn
}

export const SocketForm = <M extends ApiMethod>({
  form,
  children,
  onValid,
  close
}: PropsWithChildren<OwnProps<M>>): ReactElement | null => {
  const { t } = useTranslation()
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(data => onValid(data).then(close))} noValidate>
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

import { EffectByHandler } from 'effector'
import React, { PropsWithChildren, ReactElement, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { Api, FormApiMethod } from '../../shared/types/api'
import { ExtendedError } from '../../shared/types/extendedError'
import { Fn } from '../../shared/types/generic'
import { logger } from '../../shared/utils/logger'
import { errorContext } from '../generic/ErrorContext'
import { ButtonRow } from './ButtonRow'
import { GenericError } from './GenericError'
import { SubmitButton } from './SubmitButton'

type OwnProps<M extends FormApiMethod> = {
  form: UseFormReturn<any>
  onValid: EffectByHandler<Api[M], Error>
  close: Fn
  submitButton: TFuncKey
}

export const SocketForm = <M extends FormApiMethod>({
  form,
  children,
  onValid,
  submitButton,
  close
}: PropsWithChildren<OwnProps<M>>): ReactElement | null => {
  const { setError } = useContext(errorContext)
  const { t } = useTranslation()
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(data =>
          onValid(data)
            .then(close)
            .catch((e: ExtendedError) => {
              logger.error('Error', e)
              if (e.field != null) {
                form.setError(e.field as string, { message: e.message })
              } else {
                setError(e)
              }
            })
        )}
        noValidate
      >
        {children}
        <GenericError />
        <ButtonRow className="mt-3">
          <Button variant="outline-secondary" onClick={close}>
            {t('common.cancel')}
          </Button>
          <SubmitButton localeKey={submitButton} />
        </ButtonRow>
      </form>
    </FormProvider>
  )
}

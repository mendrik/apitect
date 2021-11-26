import { EffectByHandler } from 'effector'
import React, { PropsWithChildren, ReactElement, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { ExtendedError } from '../../hooks/usePromise'
import { Api, FormApiMethod } from '../../shared/types/api'
import { Fn, Maybe } from '../../shared/types/generic'
import { logger } from '../../shared/utils/logger'
import { ButtonRow } from './ButtonRow'
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
  const [globalError, setGlobalError] = useState<Maybe<ExtendedError>>()

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
                setGlobalError(e)
              }
            })
        )}
        noValidate
      >
        {children}
        {globalError && (
          <Alert variant={globalError.status === 500 ? 'danger' : 'warning'} className="mt-3">
            {t(globalError.message as TFuncKey)}
          </Alert>
        )}
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

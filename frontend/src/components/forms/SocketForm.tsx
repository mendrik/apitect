import { EffectByHandler } from 'effector'
import React, { PropsWithChildren, ReactElement, ReactNode, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { TFuncKey, useTranslation } from 'react-i18next'
import { Api, FormApiMethod } from '~shared/apiTypes'
import { Fn } from '~shared/types/generic'

import { Scale, Tuple } from '../generic/Tuple'
import { ButtonRow } from './ButtonRow'
import { GenericError, isExtendedError } from './GenericError'
import { SubmitButton } from './SubmitButton'

type OwnProps<M extends FormApiMethod, F extends FieldValues> = {
  form: UseFormReturn<F>
  onValid: (arg: F) => ReturnType<EffectByHandler<Api[M], Error>>
  close: Fn
  submitButton: TFuncKey
  buttonRowExtras?: ReactNode
}

export const SocketForm = <M extends FormApiMethod, F extends FieldValues>({
  form,
  children,
  onValid,
  submitButton,
  buttonRowExtras,
  close
}: PropsWithChildren<OwnProps<M, F>>): ReactElement | null => {
  const [error, setError] = useState<Error | null>(null)
  const [running, setRunning] = useState(false)

  const { t } = useTranslation()
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(data => {
          setRunning(true)
          return onValid(data as F)
            .then(close)
            .catch(e => {
              if (isExtendedError(e) && e.field != null) {
                return form.setError(e.field as any, { message: e.message })
              }
              setError(e)
            })
            .finally(() => setRunning(false))
        })}
        data-disabled={running ? 'true' : 'false'}
        noValidate
      >
        {children}
        <GenericError error={error} />
        <Tuple first={Scale.MAX} second={Scale.CONTENT}>
          <div>{buttonRowExtras}</div>
          <ButtonRow className="mt-3">
            <Button variant="outline-secondary" onClick={close}>
              {t('common.cancel')}
            </Button>
            <SubmitButton localeKey={submitButton} />
          </ButtonRow>
        </Tuple>
      </form>
    </FormProvider>
  )
}

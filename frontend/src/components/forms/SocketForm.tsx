import { EffectByHandler } from 'effector'
import { useStore } from 'effector-react'
import React, { PropsWithChildren, ReactElement, ReactNode, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'
import type { Api, ApiInput, FormApiMethod } from '~shared/apiTypes'
import { Fn } from '~shared/types/generic'

import { Scale, Tuple } from '../generic/Tuple'
import { ButtonRow } from './ButtonRow'
import { GenericError } from './GenericError'
import { SubmitButton } from './SubmitButton'

type OwnProps<M extends FormApiMethod> = {
  form: UseFormReturn<ApiInput<M>>
  onValid: EffectByHandler<Api[M], Error>
  close: Fn
  submitButton: TFuncKey
  buttonRowExtras?: ReactNode
}

export const SocketForm = <M extends FormApiMethod>({
  form,
  children,
  onValid,
  submitButton,
  buttonRowExtras,
  close
}: PropsWithChildren<OwnProps<M>>): ReactElement | null => {
  const [error, setError] = useState<Error | null>(null)
  const running = useStore(onValid.pending)

  useEffect(() => {
    const sub = onValid.failData.watch(e => {
      if (e.field != null) {
        return form.setError(e.field as string, { message: e.message })
      }
      setError(e)
    })
    return () => sub.unsubscribe()
  }, [form, setError, onValid])

  const { t } = useTranslation()
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(data => onValid(data).then(close))}
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

import React, { PropsWithChildren, ReactElement, ReactNode, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'
import useProgress from '~hooks/useProgress'
import type { FormApiMethod } from '~shared/apiTypes'
import { ExtendedError } from '~shared/types/extendedError'
import { Fn } from '~shared/types/generic'

import { errorContext } from '../generic/ErrorContext'
import { Scale, Tuple } from '../generic/Tuple'
import { ButtonRow } from './ButtonRow'
import { GenericError } from './GenericError'
import { SubmitButton } from './SubmitButton'

type OwnProps<M extends FormApiMethod> = {
  form: UseFormReturn<any> // todo try to remove any
  onValid: Fn<Promise<any>> // EffectByHandler<Api[M], Error>
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
  const [withProgress, status] = useProgress()
  const { setError } = useContext(errorContext)
  const { t } = useTranslation()
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(data =>
          withProgress(onValid(data))
            .then(close)
            .catch((e: ExtendedError) => {
              if (e.field != null) {
                form.setError(e.field as string, { message: e.message })
              } else {
                setError(e)
              }
            })
        )}
        data-disabled={status?.is === 'running' ? 'true' : 'false'}
        noValidate
      >
        {children}
        <GenericError />
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

import { ioTsResolver } from '@hookform/resolvers/io-ts'
import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ForgotPassword, TForgotPassword } from '~shared/types/forms/forgotPassword'

import { ButtonRow } from '../../forms/ButtonRow'
import { Form } from '../../forms/Form'
import { GenericError } from '../../forms/GenericError'
import { SubmitButton } from '../../forms/SubmitButton'
import { TextInput } from '../../forms/TextInput'
import usePromise from '../../hooks/usePromise'
import { useServerError } from '../../hooks/useServerError'
import { forgotPassword } from '../../utils/api'
import { ModalFC } from '../LazyModal'
import { SuccessView } from '../SuccessView'

const ForgotPasswordForm: ModalFC = ({ close }) => {
  const { t } = useTranslation()
  const form = useForm<ForgotPassword>({
    resolver: ioTsResolver(TForgotPassword),
    defaultValues: {
      email: 'andreas@mindmine.fi'
    }
  })
  const submit = usePromise('doForgotPassword', forgotPassword)
  useServerError(submit.error, form.setError)

  const Success = <SuccessView title="common.success" body="modals.forgotPassword.success" />

  return (
    <Form form={form} state={submit} successView={Success}>
      <TextInput name="email" label="form.fields.email" type="email" options={{ required: true }} />
      <Alert variant="info">{t('modals.forgotPassword.info')}</Alert>
      <GenericError />
      <ButtonRow>
        <Button variant="outline-primary" onClick={close}>
          {t('common.back')}
        </Button>
        <SubmitButton localeKey="modals.forgotPassword.submit" />
      </ButtonRow>
    </Form>
  )
}

export default ForgotPasswordForm

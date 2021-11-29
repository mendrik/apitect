import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ForgotPassword, TForgotPassword } from 'shared/types/forms/forgotPassword'

import useProgress from '../../hooks/useProgress'
import { usePromise } from '../../hooks/usePromise'
import { useView } from '../../hooks/useView'
import { forgotPassword } from '../../utils/restApi'
import { ModalFC } from '../ModalStub'
import { SuccessView } from '../SuccessView'
import { ButtonRow } from '../forms/ButtonRow'
import { Form } from '../forms/Form'
import { GenericError } from '../forms/GenericError'
import { SubmitButton } from '../forms/SubmitButton'
import { TextInput } from '../forms/TextInput'

enum Views {
  Form,
  Success
}

const ForgotPasswordForm: ModalFC = ({ close }) => {
  const { t } = useTranslation()
  const form = useForm<ForgotPassword>({
    resolver: zodResolver(TForgotPassword),
    defaultValues: {
      email: 'andreas@mindmine.fi'
    }
  })
  const { view, successView } = useView(Views)
  const [withProgress, status] = useProgress()
  const { trigger } = usePromise<ForgotPassword>(data =>
    withProgress(forgotPassword(data)).then(successView)
  )

  if (view === Views.Success) {
    return <SuccessView title="common.success" body="modals.forgotPassword.success" />
  }

  return (
    <Form form={form} status={status} trigger={trigger}>
      <TextInput
        name="email"
        label="form.fields.email"
        type="email"
        options={{ required: true }}
        containerClassNames="mb-3"
      />
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

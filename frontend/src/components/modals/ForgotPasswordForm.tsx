import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from 'effector-react'
import { Alert, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ButtonRow } from '~forms/ButtonRow'
import { Form } from '~forms/Form'
import { GenericError } from '~forms/GenericError'
import { SubmitButton } from '~forms/SubmitButton'
import { TextInput } from '~forms/TextInput'
import { useView } from '~hooks/useView'
import { ForgotPassword, TForgotPassword } from '~shared/types/forms/forgotPassword'

import { $apiError, apiFx } from '../../events/api'
import { closeModal } from '../../events/modals'
import { forgotPassword } from '../../utils/restApi'
import { SuccessView } from '../SuccessView'

enum Views {
  Form,
  Success
}

const ForgotPasswordForm = () => {
  const { t } = useTranslation()
  const form = useForm<ForgotPassword>({
    resolver: zodResolver(TForgotPassword),
    defaultValues: {
      email: 'andreas@mindmine.fi'
    }
  })
  const running = useStore(apiFx.pending)
  const error = useStore($apiError)
  const { view, successView } = useView(Views)
  const trigger = (data: ForgotPassword) => apiFx(() => forgotPassword(data)).then(successView)

  if (view === Views.Success) {
    return <SuccessView title="common.success" body="modals.forgotPassword.success" />
  }

  return (
    <Form form={form} running={running} onSubmit={trigger}>
      <TextInput
        name="email"
        label="form.fields.email"
        type="email"
        options={{ required: true }}
        containerClasses="mb-3"
      />
      <Alert variant="info">{t('modals.forgotPassword.info')}</Alert>
      <GenericError error={error} />
      <ButtonRow>
        <Button variant="outline-primary" onClick={closeModal}>
          {t('common.back')}
        </Button>
        <SubmitButton localeKey="modals.forgotPassword.submit" />
      </ButtonRow>
    </Form>
  )
}

export default ForgotPasswordForm

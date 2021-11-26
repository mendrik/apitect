import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Register, ZRegister } from 'shared/types/forms/register'

import { ModalFC } from '../components/ModalStub'
import { SuccessView } from '../components/SuccessView'
import { ButtonRow } from '../components/forms/ButtonRow'
import { Form } from '../components/forms/Form'
import { GenericError } from '../components/forms/GenericError'
import { SubmitButton } from '../components/forms/SubmitButton'
import { TextInput } from '../components/forms/TextInput'
import { userContext } from '../contexts/withUser'
import usePromise from '../hooks/usePromise'
import { register } from '../utils/restApi'

export const RegisterForm: ModalFC = ({ close }) => {
  const form = useForm<Register>({
    resolver: zodResolver(ZRegister),
    defaultValues: {
      email: 'andreas@mindmine.fi',
      name: 'Andreas Herd',
      password: 'qctxExmNQ9FEcZ',
      passwordRepeat: 'qctxExmNQ9FEcZ'
    }
  })
  const { t } = useTranslation()
  const state = usePromise('doRegister', register)
  const { setJwt } = useContext(userContext)

  const Success = (
    <SuccessView title="common.success" body="modals.authenticate.register.success">
      <ButtonRow className="mt-4">
        <Button onClick={close} variant="primary">
          {t('common.close')}
        </Button>
      </ButtonRow>
    </SuccessView>
  )

  return (
    <Form form={form} state={state} successView={Success} onSuccess={setJwt}>
      <TextInput name="name" containerClassNames="mb-3" label="form.fields.name" />
      <TextInput name="email" containerClassNames="mb-3" label="form.fields.email" type="email" />
      <TextInput
        name="password"
        label="form.fields.password"
        type="password"
        containerClassNames="mb-3"
      />
      <TextInput
        name="passwordRepeat"
        label="form.fields.passwordRepeat"
        type="password"
        containerClassNames="mb-3"
      />
      <GenericError />
      <ButtonRow>
        <SubmitButton localeKey="modals.authenticate.register.submit" />
      </ButtonRow>
    </Form>
  )
}

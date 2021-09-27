import { ioTsResolver } from '@hookform/resolvers/io-ts'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Register, TRegister } from '../../../backend/types/register'
import { ButtonRow } from '../../forms/ButtonRow'
import { Form } from '../../forms/Form'
import { SubmitButton } from '../../forms/SubmitButton'
import { TextInput } from '../../forms/TextInput'
import usePromise from '../../hooks/usePromise'
import { register } from '../../utils/api'
import { ModalFC } from '../LazyModal'
import { SuccessView } from '../SuccessView'

export const RegisterForm: ModalFC = ({ close }) => {
  const form = useForm<Register>({
    resolver: ioTsResolver(TRegister),
    defaultValues: {
      email: 'andreas@mindmine.fi',
      name: 'Andreas Herd',
      password: '1234',
      passwordRepeat: '1234'
    }
  })
  const { t } = useTranslation()
  const state = usePromise('doRegister', register)

  const Success = (
    <SuccessView title="common.success" body="modals.authenticate.register.success">
      <Button onClick={close} variant="primary">
        {t('common.close')}
      </Button>
    </SuccessView>
  )

  return (
    <Form form={form} state={state} successView={Success}>
      <TextInput name="name" label="form.fields.name" options={{ required: true }} />
      <TextInput name="email" label="form.fields.email" type="email" options={{ required: true }} />
      <TextInput
        name="password"
        label="form.fields.password"
        type="password"
        options={{ required: true }}
      />
      <TextInput
        name="passwordRepeat"
        label="form.fields.passwordRepeat"
        type="password"
        options={{ required: true }}
      />
      <ButtonRow>
        <SubmitButton localeKey="modals.authenticate.register.submit" />
      </ButtonRow>
    </Form>
  )
}

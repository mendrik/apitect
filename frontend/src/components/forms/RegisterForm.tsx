import { ioTsResolver } from '@hookform/resolvers/io-ts'
import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Register, TRegister } from 'shared/types/forms/register'

import { userContext } from '../../contexts/user'
import { ButtonRow } from '../../forms/ButtonRow'
import { Form } from '../../forms/Form'
import { GenericError } from '../../forms/GenericError'
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
    <Form form={form} state={state} successView={Success} success={setJwt}>
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
      <GenericError />
      <ButtonRow>
        <SubmitButton localeKey="modals.authenticate.register.submit" />
      </ButtonRow>
    </Form>
  )
}
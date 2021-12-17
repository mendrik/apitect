import { zodResolver } from '@hookform/resolvers/zod'
import { prop } from 'ramda'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from 'react-use'
import { ButtonRow } from '~forms/ButtonRow'
import { Form } from '~forms/Form'
import { GenericError } from '~forms/GenericError'
import { SubmitButton } from '~forms/SubmitButton'
import { TextInput } from '~forms/TextInput'
import useProgress from '~hooks/useProgress'
import { usePromise } from '~hooks/usePromise'
import { useView } from '~hooks/useView'
import { Register, ZRegister } from '~shared/types/forms/register'

import { ModalFC } from '../components/ModalStub'
import { SuccessView } from '../components/SuccessView'
import { whoAmIFx } from '../events/user'
import { register } from '../utils/restApi'

enum Views {
  Form,
  Success
}

export const RegisterForm: ModalFC = ({ close }) => {
  const { view, successView } = useView(Views)
  const [jwt, setJwt] = useLocalStorage('jwt')
  const { t } = useTranslation()

  const form = useForm<Register>({
    resolver: zodResolver(ZRegister),
    defaultValues: {
      email: 'andreas@mindmine.fi',
      name: 'Andreas Herd',
      password: 'qctxExmNQ9FEcZ',
      passwordRepeat: 'qctxExmNQ9FEcZ'
    }
  })
  const [withProgress, status] = useProgress()
  const onSubmit = usePromise<Register>(
    data => withProgress(register(data).then(prop('token')).then(setJwt)).then(successView),
    false,
    false
  )

  if (view === Views.Success) {
    return (
      <SuccessView title="common.success" body="modals.authenticate.register.success">
        <ButtonRow className="mt-4">
          <Button
            onClick={() => {
              close()
              setJwt(jwt)
              void whoAmIFx()
            }}
            variant="primary"
          >
            {t('common.close')}
          </Button>
        </ButtonRow>
      </SuccessView>
    )
  }

  return (
    <Form form={form} onSubmit={onSubmit} status={status}>
      <TextInput name="name" containerClasses="mb-3" label="form.fields.name" />
      <TextInput name="email" containerClasses="mb-3" label="form.fields.email" type="email" />
      <TextInput
        name="password"
        label="form.fields.password"
        type="password"
        containerClasses="mb-3"
      />
      <TextInput
        name="passwordRepeat"
        label="form.fields.passwordRepeat"
        type="password"
        containerClasses="mb-3"
      />
      <GenericError />
      <ButtonRow>
        <SubmitButton localeKey="modals.authenticate.register.submit" />
      </ButtonRow>
    </Form>
  )
}

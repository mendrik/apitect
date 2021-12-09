import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SocketForm } from '~forms/SocketForm'
import { useLocation } from '~hooks/useLocation'
import { Enums, ZEnums, Enum as E } from '~shared/types/domain/enums'

import { ModalFC } from '../ModalStub'
import { EditableObjectList } from '../generic/EditableObjectList'

const EnumsSettings: ModalFC = ({ close }) => {
  const { state } = useLocation<Enums>()
  const { t } = useTranslation()

  const form = useForm<{ enums: Enums }>({
    resolver: zodResolver(ZEnums),
    defaultValues: { enums: state }
  })

  return (
    <SocketForm form={form} onValid={async () => 0} close={close} submitButton="common.save">
      <Alert variant="info" className="mb-3">
        {t('modals.enumsSettings.info')}
      </Alert>
      <EditableObjectList<E> form={form} validator={ZEnums} formName="enums" titleProp="name" />
    </SocketForm>
  )
}

export default EnumsSettings

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SocketForm } from '~forms/SocketForm'
import { useLocation } from '~hooks/useLocation'
import { Enums, ZEnums } from '~shared/types/domain/enums'

import { ModalFC } from '../ModalStub'

const EnumsSettings: ModalFC = ({ close }) => {
  const { state } = useLocation<Enums>()
  const { t } = useTranslation()

  const form = useForm<Enums>({
    resolver: zodResolver(ZEnums),
    defaultValues: state
  })

  return (
    <SocketForm form={form} onValid={async () => 0} close={close} submitButton="common.save">
      <Alert variant="info" className="mb-3">
        {t('modals.enumsSettings.info')}
      </Alert>
    </SocketForm>
  )
}

export default EnumsSettings

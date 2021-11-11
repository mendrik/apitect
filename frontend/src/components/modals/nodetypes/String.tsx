import { ioTsResolver } from '@hookform/resolvers/io-ts'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { SocketForm } from '../../../forms/SocketForm'
import { TextInput } from '../../../forms/TextInput'
import {
  StringSettings,
  TStringSettings
} from '../../../shared/types/forms/nodetypes/stringSettings'
import { SettingsProps } from '../NodeSettings'

const String: SettingsProps = ({ close }) => {
  const { t } = useTranslation()

  const form = useForm<StringSettings>({
    resolver: ioTsResolver(TStringSettings)
  })

  return (
    <SocketForm submitMessage="NODE_SETTINGS" form={form} onSuccess={close}>
      <TextInput
        name="name"
        label="form.fields.nodeName"
        type="text"
        autoFocus
        options={{ required: true }}
      />
    </SocketForm>
  )
}

export default String

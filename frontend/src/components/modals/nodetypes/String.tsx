import { ioTsResolver } from '@hookform/resolvers/io-ts'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { SocketForm } from '../../../forms/SocketForm'
import { TextInput } from '../../../forms/TextInput'
import { NodeType } from '../../../shared/types/domain/nodeType'
import { NodeSettings } from '../../../shared/types/forms/nodetypes'
import { TStringSettings } from '../../../shared/types/forms/nodetypes/stringSettings'
import { ModalFC } from '../../LazyModal'

const String: ModalFC = ({ close }) => {
  const { t } = useTranslation()

  const form = useForm<NodeSettings>({
    resolver: ioTsResolver(TStringSettings),
    defaultValues: {
      nodeType: NodeType.String
    }
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

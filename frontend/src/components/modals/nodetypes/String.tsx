import { ioTsResolver } from '@hookform/resolvers/io-ts'
import { useStore } from 'effector-react'
import { isEmptyString } from 'ramda-adjunct'
import React from 'react'
import { useForm } from 'react-hook-form'

import { SocketForm } from '../../../forms/SocketForm'
import { TextInput } from '../../../forms/TextInput'
import { NodeType } from '../../../shared/types/domain/nodeType'
import { NodeSettings } from '../../../shared/types/forms/nodetypes'
import { TStringSettings } from '../../../shared/types/forms/nodetypes/stringSettings'
import $appStore from '../../../stores/$appStore'
import { ModalFC } from '../../LazyModal'

const String: ModalFC = ({ close }) => {
  const { selectedNode } = useStore($appStore)
  const form = useForm<NodeSettings>({
    resolver: ioTsResolver(TStringSettings),
    defaultValues: {
      nodeType: NodeType.String,
      name: selectedNode!.name
    }
  })

  console.log(form.getValues())

  return (
    <SocketForm submitMessage="NODE_SETTINGS" form={form} onSuccess={close} close={close}>
      <TextInput
        name="name"
        label="form.fields.nodeName"
        type="text"
        autoFocus
        options={{ required: true }}
      />
      <TextInput
        name="validation.regexp"
        label="modals.nodeSettings.string.regexp"
        type="text"
        options={{ required: false }}
      />
    </SocketForm>
  )
}

export default String

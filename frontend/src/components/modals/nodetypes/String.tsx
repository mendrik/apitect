import { ioTsResolver } from '@hookform/resolvers/io-ts'
import { useStore } from 'effector-react'
import React from 'react'
import { useForm } from 'react-hook-form'

import { updateNodeSettingsFx } from '../../../events/tree'
import { SocketForm } from '../../../forms/SocketForm'
import { TextInput } from '../../../forms/TextInput'
import { useLocation } from '../../../hooks/useLocation'
import { NodeType } from '../../../shared/types/domain/nodeType'
import { NodeSettings } from '../../../shared/types/forms/nodetypes/nodeSettings'
import { TStringSettings } from '../../../shared/types/forms/nodetypes/stringSettings'
import $appStore from '../../../stores/$appStore'
import { ModalFC } from '../../ModalStub'

const String: ModalFC = ({ close }) => {
  const { state } = useLocation<NodeSettings>()
  const { selectedNode } = useStore($appStore)
  const { id: nodeId, name } = selectedNode!.value
  const form = useForm<NodeSettings>({
    resolver: ioTsResolver(TStringSettings),
    defaultValues: {
      ...state,
      nodeType: NodeType.String,
      nodeId: state?.nodeId ?? nodeId,
      name: state?.name ?? name
    }
  })

  return (
    <SocketForm form={form} onValid={updateNodeSettingsFx} close={close}>
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

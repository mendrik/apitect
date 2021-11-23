import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from 'effector-react'
import React, { PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { updateNodeSettingsFx } from '../../events/tree'
import { SocketForm } from '../../forms/SocketForm'
import { TextInput } from '../../forms/TextInput'
import { useLocation } from '../../hooks/useLocation'
import { useUndefinedEffect } from '../../hooks/useUndefinedEffect'
import { NodeType } from '../../shared/types/domain/nodeType'
import { ZArraySettings } from '../../shared/types/forms/nodetypes/arraySettings'
import { ZBinarySettings } from '../../shared/types/forms/nodetypes/binarySettings'
import { ZBooleanSettings } from '../../shared/types/forms/nodetypes/booleanSettings'
import { ZColorSettings } from '../../shared/types/forms/nodetypes/colorSettings'
import { ZDateSettings } from '../../shared/types/forms/nodetypes/dateSettings'
import { ZEnumSettings } from '../../shared/types/forms/nodetypes/enumSettings'
import { ZLocationSettings } from '../../shared/types/forms/nodetypes/locationSettings'
import { NodeSettings as NodeSettingsType } from '../../shared/types/forms/nodetypes/nodeSettings'
import { ZNumberSettings } from '../../shared/types/forms/nodetypes/numberSettings'
import { ZObjectSettings } from '../../shared/types/forms/nodetypes/objectSettings'
import { ZReferenceSettings } from '../../shared/types/forms/nodetypes/referenceSettings'
import { ZRichTextSettings } from '../../shared/types/forms/nodetypes/richTextSettings'
import { ZStringSettings } from '../../shared/types/forms/nodetypes/stringSettings'
import { removeParams } from '../../shared/utils/url'
import $appStore from '../../stores/$appStore'
import { generateDefaults } from '../../utils/zod'
import { ModalFC } from '../ModalStub'
import ArraySettings from './nodetypes/Array'
import BinarySettings from './nodetypes/Binary'
import BooleanSettings from './nodetypes/Boolean'
import ColorSettings from './nodetypes/Color'
import DateSettings from './nodetypes/Date'
import EnumSettings from './nodetypes/Enum'
import LocationSettings from './nodetypes/Location'
import NumberSettings from './nodetypes/Number'
import ObjectSettings from './nodetypes/Object'
import ReferenceSettings from './nodetypes/Reference'
import RichTextSettings from './nodetypes/RichText'
import StringSettings from './nodetypes/String'

type ContentComponent = (props: PropsWithChildren<{}>) => JSX.Element

const content = (nodeType: NodeType): ContentComponent => {
  switch (nodeType) {
    case NodeType.Object:
      return ObjectSettings
    case NodeType.Boolean:
      return BooleanSettings
    case NodeType.String:
      return StringSettings
    case NodeType.Number:
      return NumberSettings
    case NodeType.Enum:
      return EnumSettings
    case NodeType.Date:
      return DateSettings
    case NodeType.Binary:
      return BinarySettings
    case NodeType.Array:
      return ArraySettings
    case NodeType.Color:
      return ColorSettings
    case NodeType.Location:
      return LocationSettings
    case NodeType.RichText:
      return RichTextSettings
    case NodeType.Reference:
      return ReferenceSettings
    default:
      throw Error('Unsupported node type')
  }
}

const resolver = (nodeType: NodeType) => {
  switch (nodeType) {
    case NodeType.Object:
      return ZObjectSettings
    case NodeType.Boolean:
      return ZBooleanSettings
    case NodeType.String:
      return ZStringSettings
    case NodeType.Number:
      return ZNumberSettings
    case NodeType.Enum:
      return ZEnumSettings
    case NodeType.Date:
      return ZDateSettings
    case NodeType.Binary:
      return ZBinarySettings
    case NodeType.Array:
      return ZArraySettings
    case NodeType.Color:
      return ZColorSettings
    case NodeType.Location:
      return ZLocationSettings
    case NodeType.RichText:
      return ZRichTextSettings
    case NodeType.Reference:
      return ZReferenceSettings
    default:
      throw Error('Unsupported node type')
  }
}

const NodeSettings: ModalFC = ({ close }) => {
  const { selectedNode } = useStore($appStore)
  const navigate = useNavigate()
  const { state } = useLocation<NodeSettingsType>()

  useUndefinedEffect(() => {
    navigate(removeParams(['modal']))
  }, selectedNode)

  if (!selectedNode) {
    return null
  }

  const nodeType = state?.nodeType ?? selectedNode.value.nodeType
  const { id: nodeId, name } = selectedNode.value
  const Content = content(nodeType)

  const settingsSchema = resolver(nodeType)
  const defaultValuesFromSchema = generateDefaults(settingsSchema)

  const form = useForm<NodeSettingsType>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      ...defaultValuesFromSchema,
      ...state,
      nodeType: nodeType as any,
      nodeId: state?.nodeId ?? nodeId,
      name: state?.name ?? name
    }
  })

  return (
    <SocketForm form={form} onValid={updateNodeSettingsFx} close={close} submitButton="common.save">
      <TextInput
        name="name"
        label="form.fields.nodeName"
        type="text"
        autoFocus
        containerClassNames="mb-3"
        options={{ required: true }}
      />
      <Content />
    </SocketForm>
  )
}

export default NodeSettings

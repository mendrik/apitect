import { useStore } from 'effector-react'
import React from 'react'

import { NodeType } from '../../shared/types/domain/nodeType'
import $appStore from '../../stores/$appStore'
import { ModalFC } from '../LazyModal'
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

const content = (nodeType: NodeType) => {
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

const NodeSettings: ModalFC = ({ close }) => {
  const { selectedNode } = useStore($appStore)
  const Content = content(selectedNode!.nodeType)
  return <Content close={close} />
}

export default NodeSettings

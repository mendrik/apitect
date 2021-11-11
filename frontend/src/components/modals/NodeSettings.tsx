import { useStore } from 'effector-react'
import React, { FC, lazy } from 'react'

import { NodeType } from '../../shared/types/domain/nodeType'
import { Fn } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'
import { ModalFC } from '../LazyModal'

const ObjectSettings = lazy(() => import('./nodetypes/Object'))
const BooleanSettings = lazy(() => import('./nodetypes/Boolean'))
const StringSettings = lazy(() => import('./nodetypes/String'))
const NumberSettings = lazy(() => import('./nodetypes/Number'))
const EnumSettings = lazy(() => import('./nodetypes/Enum'))
const DateSettings = lazy(() => import('./nodetypes/Date'))
const BinarySettings = lazy(() => import('./nodetypes/Binary'))
const ArraySettings = lazy(() => import('./nodetypes/Array'))
const ColorSettings = lazy(() => import('./nodetypes/Color'))
const LocationSettings = lazy(() => import('./nodetypes/Location'))
const RichTextSettings = lazy(() => import('./nodetypes/RichText'))
const ReferenceSettings = lazy(() => import('./nodetypes/Reference'))

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

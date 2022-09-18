import { prop } from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { useStoreMap } from '~hooks/useStoreMap'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Value } from '~shared/types/domain/values/value'
import { Jsx } from '~shared/types/generic'
import { $mappedNodesStore } from '~stores/$treeStore'

import { selectValue } from '../../events/values'
import { ArrayEditor } from '../editors/ArrayEditor'
import { BooleanEditor } from '../editors/BooleanEditor'
import { DateEditor } from '../editors/DateEditor'
import { EnumEditor } from '../editors/EnumEditor'
import { NumberEditor } from '../editors/NumberEditor'
import { StringEditor } from '../editors/StringEditor'

type OwnProps = {
  nodeId: NodeId
  value?: Value
  tag: string
  loading: boolean
}

export type EditorProps<T extends Value = Value> = {
  node: Node
  value: T | undefined
  tag: string
  loading: boolean
}

const getEditor = <T extends NodeType>(
  nodeType: T
): ((props: EditorProps<any>) => JSX.Element) | null => {
  switch (nodeType) {
    case NodeType.String:
      return StringEditor
    case NodeType.Boolean:
      return BooleanEditor
    case NodeType.Date:
      return DateEditor
    case NodeType.Enum:
      return EnumEditor
    case NodeType.Number:
      return NumberEditor
    case NodeType.Array:
      return ArrayEditor
    default:
      return null // todo throw Error instead when all are implemented
  }
}

const Empty = styled.div`
  width: 100%;
  height: 24px;
`

export const VisualValue = ({ nodeId, value, tag, loading }: Jsx<OwnProps>) => {
  const node = useStoreMap($mappedNodesStore, prop(nodeId))
  const Editor = getEditor(node.nodeType)

  const onFocus = () => {
    if (!document.body.classList.contains('datepicker-open')) {
      selectValue({ nodeId, value, tag })
    }
  }

  return (
    <li onFocus={onFocus}>
      {Editor ? (
        <Editor value={value} node={node} tag={tag} loading={loading} />
      ) : (
        <Empty tabIndex={0} />
      )}
    </li>
  )
}

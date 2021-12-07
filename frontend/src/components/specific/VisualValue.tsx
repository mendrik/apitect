import clsx from 'clsx'
import { useStore } from 'effector-react'
import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Value } from '~shared/types/domain/values/value'
import { Jsx } from '~shared/types/generic'

import { $mappedNodesStore } from '../../stores/$treeStore'
import { BooleanEditor } from '../editors/BooleanEditor'
import { StringEditor } from '../editors/StringEditor'
import { Placeholder } from '../generic/Placeholder'
import { valueListContext } from './VisualValueList'

type OwnProps = {
  nodeId: NodeId
  value?: Value
  tag: string
}

export type EditorProps<T extends Value = Value> = {
  node: Node
  value: T | undefined
  tag: string
}

const getEditor = <T extends NodeType>(
  nodeType: T
): ((props: EditorProps<any>) => JSX.Element) | null => {
  switch (nodeType) {
    case NodeType.String:
      return StringEditor
    case NodeType.Boolean:
      return BooleanEditor
    default:
      return null // todo throw Error instead when all are implemented
  }
}

const Empty = styled.div`
  width: 100%;
  height: 24px;
`

export const VisualValue = ({ nodeId, value, tag }: Jsx<OwnProps>) => {
  const { status, nodeIds } = useContext(valueListContext)

  const nodeMap = useStore($mappedNodesStore)
  const ref = useRef<HTMLLIElement>(null)

  const node: Node = nodeMap[nodeId]!
  const Editor = getEditor(node.nodeType)

  if (nodeIds?.includes(nodeId)) {
    if (status.is == 'error') return <span>failure...</span>
    if (status.is !== 'done') {
      return (
        <Placeholder
          style={{
            width: `${30 + (parseInt(nodeId.replace(/[^\d]/g, ''), 10) % 50)}%`,
            borderRadius: 6
          }}
        />
      )
    }
  }

  return (
    <li ref={ref} className={clsx(node.nodeType.toLowerCase())}>
      {Editor ? <Editor value={value} node={node} tag={tag} /> : <Empty tabIndex={0} />}
    </li>
  )
}

import { SortableContext } from '@dnd-kit/sortable'
import { ReactElement } from 'react'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Jsx } from '~shared/types/generic'

import { ConditionalWrapper } from '../generic/ConditionalWrapper'

type OwnProps = {
  node: TreeNode<Node>
  children: ReactElement
}

export const ChildrenSort = ({ node, children }: Jsx<OwnProps>) => {
  const isObject = node.value.nodeType === NodeType.Object
  return (
    <ConditionalWrapper
      condition={isObject}
      wrapper={({ children }) => (
        <SortableContext items={node.children.map(n => n.value.id)}>{children}</SortableContext>
      )}
    >
      {children}
    </ConditionalWrapper>
  )
}

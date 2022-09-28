import clsx from 'clsx'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'

import { selectNode } from '../../../events/tree'

type OwnProps = {
  node: TreeNode<Node>
  activatorRef: (element: HTMLElement | null) => void
  isActive: boolean
}

export const NodeName = ({ node, activatorRef, isActive }: OwnProps) => {
  const id = node.value.id
  const hasChildren = isNotNilOrEmpty(node.children)
  const name = node.value.name

  return (
    <div
      className={clsx('text-truncate position-relative', { thin: !hasChildren })}
      title={name}
      onMouseDown={() => {
        if (document.activeElement?.id === id) {
          selectNode(isActive ? null : node)
        }
      }}
      ref={activatorRef}
    >
      {name}
    </div>
  )
}

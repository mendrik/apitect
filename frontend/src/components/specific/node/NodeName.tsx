import clsx from 'clsx'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import { HTMLAttributes } from 'react'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { Jsx } from '~shared/types/generic'

import { selectNode } from '../../../events/tree'

type OwnProps = {
  node: TreeNode<Node>
  activatorRef: (element: HTMLElement | null) => void
} & HTMLAttributes<HTMLDivElement>

export const NodeName = ({ node, activatorRef, children, className, ...div }: Jsx<OwnProps>) => {
  const hasChildren = isNotNilOrEmpty(node.children)
  const name = node.value.name

  return (
    <div
      className={clsx(
        'text-truncate position-relative d-flex flex-row align-items-center',
        { thin: !hasChildren },
        className
      )}
      title={name}
      onClick={() => selectNode(node)}
      ref={activatorRef}
      {...div}
    >
      <span>{name}</span>
      {children}
    </div>
  )
}

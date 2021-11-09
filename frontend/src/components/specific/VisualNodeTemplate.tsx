import { IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import React, { FC } from 'react'
import styled from 'styled-components'

import { openNode, selectNode } from '../../events/tree'
import { TreeNode } from '../../shared/algebraic/treeNode'
import { UiNode } from '../../shared/types/domain/tree'
import $appStore from '../../stores/$appStore'
import { Icon } from '../generic/Icon'
import { NotEmptyList } from '../generic/NotEmptyList'

type OwnProps = {
  node: TreeNode<UiNode>
  depth?: number
}

const Ol = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`

const NodeGrid = styled.div`
  display: grid;
  grid-template-columns: 20px auto 20px;
  align-items: center;
  user-select: none;
  & > :first-child {
    justify-self: center;
  }
  & > :nth-child(2) {
    cursor: pointer;
  }
`

const RootWrap: FC = ({ children }) => <Ol>{children}</Ol>
const ListWrap: FC = ({ children }) => <Ol className="ps-3">{children}</Ol>

export const VisualNodeTemplate: FC<OwnProps> = ({ depth = 0, node, children: footer }) => {
  const { openNodes } = useStore($appStore)
  const hasChildren = isNotNilOrEmpty(node.children)
  const { selectedNode } = useStore($appStore)
  const open = openNodes[node.value.id]
  return (
    <>
      {depth > 0 && (
        <NodeGrid
          tabIndex={0}
          id={node.value.id}
          key={node.value.id}
          className={clsx('gap-1', { selectedNode: selectedNode?.id === node.value.id })}
          onFocus={() => selectNode(node.value)}
        >
          {hasChildren ? (
            <Icon
              icon={IconChevronRight}
              onPointerUp={() => document.getElementById(node.value.id)?.focus()}
              onClick={() => openNode([node.value.id, !open])}
              iconClasses={clsx('rotate', { deg90: open })}
              size={14}
            />
          ) : (
            <div />
          )}
          <div className={clsx('text-truncate', { thin: !hasChildren })} title={node.value.name}>
            {node.value.name}
          </div>
        </NodeGrid>
      )}
      {(open || depth === 0) && (
        <NotEmptyList list={node.children} as={depth === 0 ? RootWrap : ListWrap}>
          {mapIndexed((node, idx) => (
            <li key={idx}>
              <VisualNodeTemplate node={node} depth={depth + 1} />
            </li>
          ))}
        </NotEmptyList>
      )}
      {footer}
    </>
  )
}

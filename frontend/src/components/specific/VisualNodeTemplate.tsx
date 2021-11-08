import { IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import React, { FC } from 'react'
import styled from 'styled-components'

import { selectNode } from '../../events/tree'
import { TreeNode } from '../../shared/algebraic/treeNode'
import appStore from '../../stores/appStore'
import { Icon } from '../generic/Icon'
import { NotEmptyList } from '../generic/NotEmptyList'

export type VisualNode = {
  id: string
  name: string
  open: boolean
}

type OwnProps = {
  node: TreeNode<VisualNode>
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
  const hasChildren = isNotNilOrEmpty(node.children)
  const { selectedNode } = useStore(appStore)
  return (
    <>
      {depth > 0 && (
        <NodeGrid
          tabIndex={0}
          id={node.value.id}
          className={clsx('gap-1', { selectedNode: selectedNode?.id === node.value.id })}
          onFocus={() => selectNode(node.value)}
        >
          {hasChildren ? (
            <Icon
              icon={IconChevronRight}
              onClick={() => (node.value.open = !node.value.open)}
              iconClasses={clsx('rotate', { deg90: node.value.open })}
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
      {(node.value.open || depth === 0) && (
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

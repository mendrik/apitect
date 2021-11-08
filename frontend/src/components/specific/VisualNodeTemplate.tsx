import { IconSquareMinus, IconSquarePlus } from '@tabler/icons'
import clsx from 'clsx'
import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import React, { FC } from 'react'
import styled from 'styled-components'

import { selectNode } from '../../events/tree'
import { TreeNode } from '../../shared/algebraic/treeNode'
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
  return (
    <>
      {depth > 0 && (
        <NodeGrid
          tabIndex={0}
          id={node.value.id}
          className="gap-1"
          onFocus={() => selectNode(node)}
        >
          {hasChildren ? (
            node.value.open ? (
              <Icon
                icon={IconSquareMinus}
                onClick={() => (node.value.open = false)}
                focus={false}
                size={14}
                className="gray-icon"
              />
            ) : (
              <Icon
                icon={IconSquarePlus}
                onClick={() => (node.value.open = true)}
                size={14}
                focus={false}
                className="gray-icon"
              />
            )
          ) : (
            <div />
          )}
          <div className={clsx('text-truncate', { thin: !hasChildren })}>{node.value.name}</div>
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

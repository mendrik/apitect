import clsx from 'clsx'
import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import React, { FC } from 'react'
import { ArrowRight, MinusSquare, PlusSquare } from 'react-feather'
import styled from 'styled-components'

import { TreeNode } from '../../shared/algebraic/treeNode'
import { NotEmptyList } from '../generic/NotEmptyList'

export type VisualNode = {
  name: string
  open: boolean
}

type OwnProps = {
  node: TreeNode<VisualNode>
  depth: number
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
  & > :last-child {
    justify-self: end;
  }
`

const RootWrap: FC = ({ children }) => <Ol>{children}</Ol>
const ListWrap: FC = ({ children }) => <Ol className="ps-3">{children}</Ol>

export const VisualNodeTemplate: FC<OwnProps> = ({ depth, node, children: footer }) => {
  const hasChildren = isNotNilOrEmpty(node.children)
  return (
    <div>
      {depth > 0 && (
        <NodeGrid>
          {hasChildren ? (
            node.value.open ? (
              <MinusSquare
                width={12}
                color="#adb5bd"
                style={{ cursor: 'pointer' }}
                onClick={() => (node.value.open = false)}
              />
            ) : (
              <PlusSquare
                width={12}
                color="#adb5bd"
                style={{ cursor: 'pointer' }}
                onClick={() => (node.value.open = true)}
              />
            )
          ) : (
            <div />
          )}
          <div className={clsx('text-truncate', { thin: !hasChildren })}>{node.value.name}</div>
          {!hasChildren ? (
            <ArrowRight width={12} color="#adb5bd" style={{ cursor: 'pointer' }} />
          ) : (
            <div />
          )}
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
    </div>
  )
}

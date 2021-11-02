import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import React, { FC } from 'react'
import { ArrowRight, MinusSquare } from 'react-feather'
import styled from 'styled-components'

import { TreeNode } from '../../shared/algebraic/treeNode'
import { NotEmptyList } from '../generic/NotEmptyList'

type OwnProps = {
  node: TreeNode<{ name: string }>
  root: boolean
}

const Ol = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`

const NodeGrid = styled.div`
  display: grid;
  grid-template-columns: 20px auto 20px;
  & > :last-child {
    justify-self: end;
  }
`

const RootWrap: FC = ({ children }) => <Ol>{children}</Ol>
const ListWrap: FC = ({ children }) => <Ol className="ps-3">{children}</Ol>

export const VisualNodeTemplate: FC<OwnProps> = ({ root, node, children }) => {
  return (
    <div>
      {!root && (
        <NodeGrid>
          {isNotNilOrEmpty(node.children) ? (
            <MinusSquare width={12} color="#adb5bd" style={{ cursor: 'pointer' }} />
          ) : (
            <div />
          )}
          <div className="text-truncate">{node.value.name}</div>
          <ArrowRight width={12} color="#adb5bd" style={{ cursor: 'pointer' }} />
        </NodeGrid>
      )}
      <NotEmptyList list={node.children} as={root ? RootWrap : ListWrap}>
        {mapIndexed((node, idx) => (
          <li key={idx}>
            <VisualNodeTemplate node={node} root={false} />
          </li>
        ))}
      </NotEmptyList>
      {children}
    </div>
  )
}

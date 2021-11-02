import { mapIndexed } from 'ramda-adjunct'
import React, { FC } from 'react'
import styled from 'styled-components'

import { TreeNode } from '../../shared/algebraic/treeNode'
import { NotEmptyList } from '../generic/NotEmptyList'
import { Scale, Tuple } from '../generic/Tuple'

type OwnProps = {
  node: TreeNode<{ name: string }>
  root: boolean
}

export const Column = styled.div`
  padding: 0.5rem;
`

const Ol = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`

const ListWrap: FC = ({ children }) => <Ol>{children}</Ol>

export const VisualNodeTemplate: FC<OwnProps> = ({ root, node, children }) => {
  return (
    <Column>
      {!root && (
        <Tuple first={Scale.MAX} second={Scale.CONTENT}>
          <div>{node.value.name}</div>
          <div>-</div>
        </Tuple>
      )}
      <NotEmptyList list={node.children} as={ListWrap}>
        {mapIndexed((node, idx) => (
          <li key={idx}>
            <VisualNodeTemplate node={node} root={false} />
          </li>
        ))}
      </NotEmptyList>
      {children}
    </Column>
  )
}

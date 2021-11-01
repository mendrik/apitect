import { map } from 'ramda'
import React, { FC } from 'react'
import styled from 'styled-components'

import { TreeNode } from '../../shared/algebraic/treeNode'
import { VisualNode } from '../../stores/treeStore'
import { NotEmptyList } from '../generic/NotEmptyList'
import { Scale, Tuple } from '../generic/Tuple'

type OwnProps = {
  node: TreeNode<VisualNode>
}

export const Column = styled.div`
  padding: 0.5rem;
`

export const VisualNodeTemplate: FC<OwnProps> = ({ node, children }) => {
  return (
    <Column>
      {node.value.name != '' && (
        <Tuple first={Scale.MAX} second={Scale.CONTENT}>
          <div>{node.value.name}</div>
          <div>-</div>
        </Tuple>
      )}
      <NotEmptyList list={node.children}>
        {map(node => (
          <li>
            <VisualNodeTemplate node={node} />
          </li>
        ))}
      </NotEmptyList>
      {children}
    </Column>
  )
}

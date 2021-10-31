import { map } from 'ramda'
import React, { FC } from 'react'

import { TreeNode } from '../../shared/algebraic/treeNode'
import { VisualNode } from '../../stores/treeStore'
import { NotEmptyList } from '../generic/NotEmptyList'
import { Scale, Tuple } from '../generic/Tuple'

type OwnProps = {
  node: TreeNode<VisualNode>
}

export const VisualNodeTemplate: FC<OwnProps> = ({ node }) => {
  return (
    <div>
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
    </div>
  )
}

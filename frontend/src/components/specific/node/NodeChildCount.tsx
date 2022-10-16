import { useStoreMap } from 'effector-react'
import { prop } from 'ramda'
import { Badge } from 'react-bootstrap'
import styled from 'styled-components'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { $openNodes } from '~stores/$openNodesStore'

import { useIsDragged } from './useIsDragged'

type OwnProps = {
  node: TreeNode<Node>
}

const BadgeSx = styled(Badge)`
  font-size: 0.6rem;
  background-color: #f1f7e1 !important;
  color: #666;
`

export const NodeChildCount = ({ node }: OwnProps) => {
  const isDragged = useIsDragged(node)
  const open = useStoreMap($openNodes, prop(node.value.id))

  const count = node.children.length
  return isDragged && open && count > 0 ? (
    <BadgeSx pill className="ms-1">
      {count}
    </BadgeSx>
  ) : null
}

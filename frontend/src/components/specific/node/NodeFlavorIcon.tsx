import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { iconMap, NodeType } from '~shared/types/domain/nodeType'

import { Icon } from '../../generic/Icon'
import { useIsDragged } from './useIsDragged'

type OwnProps = {
  node: TreeNode<Node>
}

export const NodeFlavorIcon = ({ node }: OwnProps) => {
  const isDragged = useIsDragged(node)
  const nodeType = node.value.nodeType
  const shouldRender = !isDragged && nodeType === NodeType.Array
  return shouldRender ? <Icon icon={iconMap[nodeType]} size={14} disabled tabIndex={-1} /> : null
}

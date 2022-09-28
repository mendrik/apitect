import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { iconMap, NodeType } from '~shared/types/domain/nodeType'

import { Icon } from '../../generic/Icon'

type OwnProps = {
  isDragGhost: boolean
  node: TreeNode<Node>
}

export const NodeFlavorIcon = ({ isDragGhost, node }: OwnProps) => {
  const nodeType = node.value.nodeType
  const shouldRender = !isDragGhost && nodeType === NodeType.Array
  return shouldRender ? <Icon icon={iconMap[nodeType]} size={14} disabled tabIndex={0} /> : null
}

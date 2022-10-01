import { IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import { prop } from 'ramda'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import { useStoreMap } from '~hooks/useStoreMap'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { iconMap, NodeType } from '~shared/types/domain/nodeType'
import { $openNodes } from '~stores/$openNodesStore'

import { openNodeState } from '../../../events/tree'
import { Icon } from '../../generic/Icon'

type OwnProps = {
  node: TreeNode<Node>
}

export const NodeIcon = ({ node }: OwnProps) => {
  const open = useStoreMap($openNodes, prop(node.value.id))
  const nodeType = node.value.nodeType
  const hasChildren = isNotNilOrEmpty(node.children)

  return hasChildren ? (
    <Icon
      icon={IconChevronRight}
      onClick={() => openNodeState([node, !open])}
      iconClasses={clsx('rotate', { deg90: open })}
      size={14}
    />
  ) : nodeType !== NodeType.Object && nodeType !== NodeType.Array ? (
    <Icon icon={iconMap[nodeType]} size={14} disabled />
  ) : (
    <div />
  )
}

import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { iconMap } from '~shared/types/domain/nodeType'

import { Icon } from '../../generic/Icon'
import { NodeChildCount } from './NodeChildCount'
import { NodeName } from './NodeName'
import { NodeGrid } from './VisualNode'

type OwnProps = {
  node: TreeNode<Node>
}

export const DraggedNode = ({ node }: OwnProps) => (
  <div
    className="bg-opacity-75 border border-1 rounded border-dotted"
    style={{ backgroundColor: '#f1f7e199' }}
  >
    <NodeGrid>
      <Icon icon={iconMap[node.value.nodeType]} size={14} disabled />
      <NodeName node={node}>
        <NodeChildCount node={node} />
      </NodeName>
    </NodeGrid>
  </div>
)

import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'

import { NodeChildCount } from './NodeChildCount'
import { NodeName } from './NodeName'

type OwnProps = {
  node: TreeNode<Node>
}

export const DraggedNode = ({ node }: OwnProps) => (
  <div className="bg-white bg-opacity-75 border border-1 rounded border-dotted ps-2">
    <NodeName node={node}>
      <NodeChildCount node={node} />
    </NodeName>
  </div>
)

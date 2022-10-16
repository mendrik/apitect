import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { OptNode } from '~shared/types/generic'

import { Draggables } from '../../../utils/draggables'

export type DndOver = {
  type: Draggables
  arrayNode: OptNode
  node: TreeNode<Node>
}

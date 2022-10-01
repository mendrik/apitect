import { useDndContext } from '@dnd-kit/core'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'

export const useIsDragged = (node: TreeNode<Node>): boolean => {
  const { active } = useDndContext()

  return active?.id === node.value.id
}

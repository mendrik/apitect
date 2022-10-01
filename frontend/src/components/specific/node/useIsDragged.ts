import { useDndContext } from '@dnd-kit/core'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'

export const useIsDragged = (node: TreeNode<Node>): boolean => {
  const { active, ...rest } = useDndContext()

  // eslint-disable-next-line no-console
  console.log(rest)
  return active?.id === node.value.id
}

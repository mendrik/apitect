import { createEvent } from 'effector'

import { VisualNode } from '../components/specific/VisualNodeTemplate'
import { TreeNode } from '../shared/algebraic/treeNode'

export const selectNode = createEvent<TreeNode<VisualNode>>()

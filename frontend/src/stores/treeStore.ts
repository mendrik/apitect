import { createApi, createStore } from 'effector'

import { TreeNode } from '../shared/algebraic/treeNode'

export type VisualNode = {
  name: string
  open: boolean
  edit: boolean
}

const rootNode = TreeNode.of<VisualNode>({ name: '', open: true, edit: false })
export const treeStore = createStore<TreeNode<VisualNode>>(rootNode)

export const api = createApi(treeStore, {
  createNode: (root, node) => root,
  deleteNode: (root, node) => root
})

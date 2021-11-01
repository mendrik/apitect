import { createApi, createStore } from 'effector'

import { TreeNode } from '../shared/algebraic/treeNode'

export type VisualNode = {
  name: string
  open: boolean
  edit: boolean
}

const rootNode = TreeNode.of<VisualNode>({ name: '', open: true, edit: false })
export const treeStore = createStore<TreeNode<VisualNode>>(rootNode)

type ApiArgs = {
  createNode: TreeNode<VisualNode>
  deleteNode: TreeNode<VisualNode>
}

type StateApi<T, Api> = {
  [K in keyof Api]: Api[K] extends any[]
    ? (state: T, ...args: Api[K]) => T
    : (state: T, args: Api[K]) => T
}

export const api = createApi<TreeNode<VisualNode>, StateApi<TreeNode<VisualNode>, ApiArgs>>(
  treeStore,
  {
    createNode: (root, node) => root,
    deleteNode: (root, node) => root
  }
)

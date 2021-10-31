import { createApi, createStore } from 'effector'

import { TreeNode } from '../shared/types/treeNode'

type Node = {
  name: string
  open: boolean
  edit: boolean
}

const rootNode = TreeNode.of<Node>({ name: 'root', open: true, edit: false })
const tree = createStore<TreeNode<Node>>(rootNode)

const api = createApi(tree, {
  createNode: (root, node) => root,
  deleteNode: (root, node) => root
})

export default api

import { useStore } from 'effector-react'
import { cond, pipe, propEq } from 'ramda'
import { isTrue } from 'ramda-adjunct'
import React, { useMemo } from 'react'

import {
  closeNode,
  deleteNodeFx,
  newNodeFx,
  nodeSettingsFx,
  openNode,
  selectNode
} from '../../events/tree'
import { useDefinedEffect } from '../../hooks/useDefinedEffect'
import { TreeNode } from '../../shared/algebraic/treeNode'
import { Node } from '../../shared/types/domain/node'
import { Jsx } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'
import { preventDefault as pd } from '../../utils/preventDefault'
import { VisualNodeTemplate } from './VisualNodeTemplate'

export const VisualTree = ({ children }: Jsx) => {
  const { tree, openNodes, selectedNode } = useStore($appStore)
  const root = useMemo(() => TreeNode.from<Node, 'children'>('children')(tree), [tree])

  const isVisible = (n: TreeNode<Node>) =>
    n
      .pathToRoot()
      .map(n => openNodes[n.id])
      .every(isTrue)

  useDefinedEffect(node => {
    document.getElementById(node.value.id)?.focus({ preventScroll: true })
  }, selectedNode)

  const nextNode = () => selectedNode?.next(isVisible)
  const prevNode = () => selectedNode?.prev(isVisible)

  const keyMap = cond([
    [propEq('key', 'ArrowDown'), pd(pipe(nextNode, selectNode))],
    [propEq('key', 'ArrowUp'), pd(pipe(prevNode, selectNode))],
    [propEq('key', 'ArrowRight'), pd(() => openNode(selectedNode))],
    [propEq('key', 'ArrowLeft'), pd(() => closeNode(selectedNode))],
    [propEq('key', 'Delete'), pd(() => selectedNode && deleteNodeFx(selectedNode.value.id))],
    [propEq('key', 'n'), pd(() => newNodeFx(selectedNode?.value))],
    [propEq('key', 'Enter'), pd(() => selectedNode && nodeSettingsFx(selectedNode.value.id))]
  ])

  return (
    <div onKeyDown={keyMap}>
      <VisualNodeTemplate node={root}>{children}</VisualNodeTemplate>
    </div>
  )
}

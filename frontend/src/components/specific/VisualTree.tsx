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
import { useConfirmation } from '../../hooks/useConfirmation'
import { useDefinedEffect } from '../../hooks/useDefinedEffect'
import { TreeNode } from '../../shared/algebraic/treeNode'
import { Node } from '../../shared/types/domain/node'
import { Jsx } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'
import { focus } from '../../utils/focus'
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

  useDefinedEffect(node => focus(document.getElementById(node.value.id)), selectedNode)

  const nextNode = () => selectedNode?.next(isVisible)
  const prevNode = () => selectedNode?.prev(isVisible)
  const [ConfirmModal, confirmDelete] = useConfirmation(
    'common.questions.delete',
    () => selectedNode && deleteNodeFx(selectedNode.value.id)
  )

  const keyMap = cond([
    [propEq('key', 'ArrowDown'), pd(pipe(nextNode, selectNode))],
    [propEq('key', 'ArrowUp'), pd(pipe(prevNode, selectNode))],
    [propEq('key', 'ArrowRight'), pd(() => openNode(selectedNode))],
    [propEq('key', 'ArrowLeft'), pd(() => closeNode(selectedNode))],
    [propEq('key', 'Delete'), confirmDelete],
    [propEq('key', 'n'), pd(() => newNodeFx(selectedNode?.value))],
    [propEq('key', 'Enter'), pd(() => selectedNode && nodeSettingsFx(selectedNode.value.id))],
    [propEq('code', 'Escape'), pd(() => selectNode(undefined))]
  ])

  return (
    <div onKeyDown={keyMap}>
      <VisualNodeTemplate node={root}>{children}</VisualNodeTemplate>
      <ConfirmModal />
    </div>
  )
}

import { useStore } from 'effector-react'
import { cond, pathEq, pipe, propEq } from 'ramda'
import { isTrue } from 'ramda-adjunct'
import React, { useMemo } from 'react'

import { openModal } from '../../events/modals'
import { closeNode, deleteNodeFx, openNode, selectNode } from '../../events/tree'
import { useDefinedEffect } from '../../hooks/useDefinedEffect'
import { Strategy, TreeNode } from '../../shared/algebraic/treeNode'
import { Node } from '../../shared/types/domain/tree'
import { Fn, Jsx, Maybe } from '../../shared/types/generic'
import { ModalNames } from '../../shared/types/modals'
import { next, prev } from '../../shared/utils/ramda'
import $appStore from '../../stores/$appStore'
import { preventDefault } from '../../utils/preventDefault'
import { VisualNodeTemplate } from './VisualNodeTemplate'

const visibleNodes = (root: Node, openNodes: Record<string, boolean>) =>
  TreeNode.from<Node, 'children'>('children')(root)
    .flatten(Strategy.Depth)
    .filter(n =>
      n
        .pathToRoot()
        .map(p => openNodes[p.id])
        .every(isTrue)
    )

export const VisualTree = ({ children }: Jsx) => {
  const { tree, openNodes, selectedNode } = useStore($appStore)
  const visualNodes = useMemo(() => visibleNodes(tree, openNodes), [tree, openNodes])

  useDefinedEffect(node => {
    document.getElementById(node.value.id)?.focus({ preventScroll: true })
  }, selectedNode)

  const nextNode = (): Maybe<TreeNode<Node>> =>
    next(pathEq(['value', 'id'], selectedNode?.value.id))(visualNodes.slice(1))
  const prevNode = (): Maybe<TreeNode<Node>> =>
    prev(pathEq(['value', 'id'], selectedNode?.value.id))(visualNodes.slice(1))

  const keyMap = cond([
    [propEq('key', 'ArrowDown'), pipe(nextNode, selectNode)],
    [propEq('key', 'ArrowUp'), pipe(prevNode, selectNode)],
    [propEq('key', 'ArrowRight'), () => openNode(selectedNode)],
    [propEq('key', 'ArrowLeft'), () => closeNode(selectedNode)],
    [propEq('key', 'Delete'), () => deleteNodeFx(selectedNode!.value.id)],
    [propEq('key', 'n'), () => openModal(ModalNames.NEW_NODE)],
    [propEq('key', 'Enter'), () => openModal(ModalNames.NODE_SETTINGS)]
  ]) as Fn

  return (
    <div onKeyDown={preventDefault(keyMap)}>
      <VisualNodeTemplate node={visualNodes[0]}>{children}</VisualNodeTemplate>
    </div>
  )
}

import { useStore } from 'effector-react'
import { cond, pipe, prop, propEq } from 'ramda'
import { isTrue } from 'ramda-adjunct'
import React, { FC } from 'react'

import { openModal } from '../../events/modals'
import { closeNode, deleteNode, openNode, selectNode } from '../../events/tree'
import { useDefinedEffect } from '../../hooks/useDefinedEffect'
import { Strategy, TreeNode } from '../../shared/algebraic/treeNode'
import { UiNode } from '../../shared/types/domain/tree'
import { Fn, Maybe } from '../../shared/types/generic'
import { next, prev } from '../../shared/utils/ramda'
import $appStore from '../../stores/$appStore'
import { preventDefault } from '../../utils/preventDefault'
import { VisualNodeTemplate } from './VisualNodeTemplate'

const visibleNodes = (root: UiNode, openNodes: Record<string, boolean>) =>
  TreeNode.from<UiNode, 'children'>('children')(root)
    .flatten(Strategy.Depth)
    .filter(n =>
      n
        .pathToRoot()
        .map(p => openNodes[p.id])
        .every(isTrue)
    )
    .map(prop('value'))
    .slice(1)

export const VisualTree: FC = ({ children }) => {
  const { tree, openNodes, selectedNode } = useStore($appStore)
  const visualNodes = () => visibleNodes(tree, openNodes)

  useDefinedEffect(
    node => document.getElementById(node.id)?.focus({ preventScroll: true }),
    selectedNode
  )

  const nextNode = (): Maybe<UiNode> => next(propEq('id', selectedNode?.id))(visualNodes())
  const prevNode = (): Maybe<UiNode> => prev(propEq('id', selectedNode?.id))(visualNodes())

  const keyMap = cond([
    [propEq('key', 'ArrowDown'), pipe(nextNode, selectNode)],
    [propEq('key', 'ArrowUp'), pipe(prevNode, selectNode)],
    [propEq('key', 'ArrowRight'), () => openNode(selectedNode)],
    [propEq('key', 'ArrowLeft'), () => closeNode(selectedNode)],
    [propEq('key', 'Delete'), () => deleteNode(selectedNode)],
    [propEq('key', 'Space'), () => selectNode()],
    [propEq('key', 'n'), () => openModal('new-node')]
  ]) as Fn

  return (
    <div onKeyDown={preventDefault(keyMap)}>
      <VisualNodeTemplate node={tree}>{children}</VisualNodeTemplate>
    </div>
  )
}

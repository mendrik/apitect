import { useStore } from 'effector-react'
import { either, pipe, prop, propEq, when } from 'ramda'
import { isTrue } from 'ramda-adjunct'
import React, { FC, useRef } from 'react'

import { openModal } from '../../events/modals'
import { closeNode, deleteNode, openNode, selectNode } from '../../events/tree'
import { useDefinedEffect } from '../../hooks/useDefinedEffect'
import { useEvent } from '../../hooks/useEvent'
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
  const treeRef = useRef<HTMLDivElement>(null)
  const visualNodes = () => visibleNodes(tree, openNodes)

  useDefinedEffect(
    node => document.getElementById(node.id)?.focus({ preventScroll: true }),
    selectedNode
  )

  const nextFocusNode = (): Maybe<UiNode> => next(propEq('id', selectedNode?.id))(visualNodes())
  const prevFocusNode = (): Maybe<UiNode> => prev(propEq('id', selectedNode?.id))(visualNodes())
  const keyHandler = (key: string, fn: Fn) =>
    useEvent(
      'keydown',
      when(either(propEq<any>('code', key), propEq<any>('key', key)), preventDefault(fn)),
      treeRef
    )

  keyHandler('Space', () => selectNode())
  keyHandler('n', () => openModal('new-node'))
  keyHandler('Delete', () => deleteNode(selectedNode))
  keyHandler('ArrowDown', pipe(nextFocusNode, selectNode))
  keyHandler('ArrowUp', pipe(prevFocusNode, selectNode))
  keyHandler('ArrowRight', () => openNode(selectedNode))
  keyHandler('ArrowLeft', () => closeNode(selectedNode))

  return (
    <div ref={treeRef}>
      <VisualNodeTemplate node={tree}>{children}</VisualNodeTemplate>
    </div>
  )
}

import { useStore } from 'effector-react'
import { pipe, prop, propEq, when } from 'ramda'
import { isTrue } from 'ramda-adjunct'
import React, { FC, useMemo, useRef, useState } from 'react'

import { closeNode, deleteNode, openNode, selectNode } from '../../events/tree'
import { useEvent } from '../../hooks/useEvent'
import { Strategy, TreeNode } from '../../shared/algebraic/treeNode'
import { UiNode } from '../../shared/types/domain/tree'
import { Fn, Maybe } from '../../shared/types/generic'
import { next, prev } from '../../shared/utils/ramda'
import $appStore from '../../stores/$appStore'
import { preventDefault } from '../../utils/preventDefault'
import { VisualNodeTemplate } from './VisualNodeTemplate'

const visibleNodes = (root: TreeNode<UiNode>, openNodes: Record<string, boolean>) =>
  root
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
  const [, forceRender] = useState(false)
  const treeRef = useRef<HTMLDivElement>(null)
  const visualTree: TreeNode<UiNode> = useMemo(
    () =>
      TreeNode.from<UiNode, 'children'>('children')(tree).map(
        t =>
          new Proxy<any>(
            { id: t.id, name: t.name, type: t.type },
            {
              set<T extends UiNode>(target: T, prop: keyof T, value: any): boolean {
                target[prop] = value
                forceRender(s => !s)
                return true
              }
            }
          )
      ),
    [tree]
  )
  const visualNodes = () => visibleNodes(visualTree, openNodes)

  const nextFocusNode = (): Maybe<UiNode> => next(propEq('id', selectedNode?.id))(visualNodes())
  const prevFocusNode = (): Maybe<UiNode> => prev(propEq('id', selectedNode?.id))(visualNodes())
  const keyHandler = (key: string, fn: Fn) =>
    useEvent('keydown', when(propEq<any>('key', key), preventDefault(fn)), treeRef)

  keyHandler('Delete', () => deleteNode(selectedNode))
  keyHandler('ArrowDown', pipe(nextFocusNode, selectNode))
  keyHandler('ArrowUp', pipe(prevFocusNode, selectNode))
  keyHandler('ArrowRight', () => openNode(selectedNode))
  keyHandler('ArrowLeft', () => closeNode(selectedNode))

  return (
    <div ref={treeRef}>
      <VisualNodeTemplate node={visualTree}>{children}</VisualNodeTemplate>
    </div>
  )
}

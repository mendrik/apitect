import { useStore } from 'effector-react'
import { find, pipe, prop, propEq, when } from 'ramda'
import { isTrue } from 'ramda-adjunct'
import React, { FC, useMemo, useRef, useState } from 'react'

import { deleteNode, openNode } from '../../events/tree'
import { useEvent } from '../../hooks/useEvent'
import { Strategy, TreeNode } from '../../shared/algebraic/treeNode'
import { UiNode } from '../../shared/types/domain/tree'
import { Fn, Maybe } from '../../shared/types/generic'
import { next, prev } from '../../shared/utils/ramda'
import $appStore from '../../stores/$appStore'
import { domElementById, focus } from '../../utils/focus'
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

  const activeId = () => document.activeElement?.id

  const nextFocusNode = (): Maybe<UiNode> => next(propEq('id', activeId()))(visualNodes())
  const prevFocusNode = (): Maybe<UiNode> => prev(propEq('id', activeId()))(visualNodes())
  const curFocusNode = (): Maybe<UiNode> => find(propEq('id', activeId()), visualNodes())
  const keyHandler = (key: string, fn: Fn) =>
    useEvent('keydown', when(propEq<any>('key', key), preventDefault(fn)), treeRef)

  {
    keyHandler('Delete', () => (selectedNode ? deleteNode(selectedNode) : void 0))
    keyHandler('ArrowDown', pipe(nextFocusNode, domElementById, focus))
    keyHandler('ArrowUp', pipe(prevFocusNode, domElementById, focus))
    keyHandler(
      'ArrowRight',
      pipe(curFocusNode, n => (n ? openNode([n.id, true]) : void 0))
    )
    keyHandler(
      'ArrowLeft',
      pipe(curFocusNode, n => (n ? openNode([n.id, false]) : void 0))
    )
  }

  return (
    <div ref={treeRef}>
      <VisualNodeTemplate node={visualTree}>{children}</VisualNodeTemplate>
    </div>
  )
}

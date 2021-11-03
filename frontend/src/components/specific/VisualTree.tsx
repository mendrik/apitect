import { useStore } from 'effector-react'
import { find, pipe, prop, propEq, when } from 'ramda'
import { isTrue } from 'ramda-adjunct'
import React, { FC, useMemo, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

import { Strategy, TreeNode } from '../../shared/algebraic/treeNode'
import { UiNode } from '../../shared/types/domain/tree'
import { Fn, Maybe } from '../../shared/types/generic'
import { next, prev } from '../../shared/utils/ramda'
import appStore from '../../stores/appStore'
import { domElementById, focus } from '../../utils/focus'
import { VisualNode, VisualNodeTemplate } from './VisualNodeTemplate'

const visibleNodes = (root: TreeNode<VisualNode>) =>
  root
    .flatten(Strategy.Depth)
    .filter(n => n.pathToRoot().map(prop('open')).every(isTrue))
    .map(prop('value'))
    .slice(1)

export const VisualTree: FC = ({ children }) => {
  const { tree } = useStore(appStore)
  const [render, forceRender] = useState(false)
  const treeRef = useRef<HTMLDivElement>(null)
  const visualTree = useMemo(
    () =>
      TreeNode.from<UiNode, 'children'>('children')(tree).map(
        t =>
          new Proxy<VisualNode>(
            { id: t.id, name: t.name, open: t.id === tree.id },
            {
              set<T extends VisualNode>(target: T, prop: keyof T, value: any): boolean {
                target[prop] = value
                forceRender(s => !s)
                return true
              }
            }
          )
      ),
    [tree]
  )
  const visualNodes = useMemo(() => visibleNodes(visualTree), [visualTree, render])

  const activeId = () => document.activeElement?.id

  const nextFocusNode = (): Maybe<VisualNode> => next(propEq('id', activeId()))(visualNodes)
  const prevFocusNode = (): Maybe<VisualNode> => prev(propEq('id', activeId()))(visualNodes)
  const curFocusNode = (): Maybe<VisualNode> => find(propEq('id', activeId()), visualNodes)
  const keyHandler = (key: string, fn: Fn) =>
    useEventListener('keydown', when(propEq<any>('key', key), fn), treeRef)

  // prettier-ignore
  {
    keyHandler('ArrowDown', pipe(nextFocusNode, domElementById, focus))
    keyHandler('ArrowUp', pipe(prevFocusNode, domElementById, focus))
    keyHandler('ArrowRight', pipe(curFocusNode, n => n && (n.open = true)))
    keyHandler('ArrowLeft', pipe(curFocusNode, n => n && (n.open = false)))
  }

  return (
    <div ref={treeRef}>
      <VisualNodeTemplate node={visualTree}>{children}</VisualNodeTemplate>
    </div>
  )
}

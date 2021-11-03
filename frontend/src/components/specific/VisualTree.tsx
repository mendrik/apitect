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
  const [, forceRender] = useState(false)
  const treeRef = useRef<HTMLDivElement>(null)
  const visualTree = useMemo(() => {
    const t = TreeNode.from<UiNode, 'children'>('children')(tree)
    return t.map(
      t =>
        new Proxy<VisualNode>(
          {
            id: t.id,
            name: t.name,
            open: t.id === tree.id
          },
          {
            set<T extends VisualNode>(target: T, prop: keyof T, value: any): boolean {
              target[prop] = value
              forceRender(s => !s)
              return true
            }
          }
        )
    )
  }, [tree])

  const activeId = () => document.activeElement?.id

  const nextFocusNode = (): Maybe<VisualNode> =>
    next(propEq('id', activeId()))(visibleNodes(visualTree))

  const prevFocusNode = (): Maybe<VisualNode> =>
    prev(propEq('id', activeId()))(visibleNodes(visualTree))

  const curFocusNode = (): Maybe<VisualNode> =>
    find(propEq('id', activeId()), visibleNodes(visualTree))

  const keyHandler = (key: string, fn: Fn) => when(propEq<any>('key', key), fn)

  useEventListener(
    'keyup',
    keyHandler('ArrowDown', pipe(nextFocusNode, domElementById, focus)),
    treeRef
  )
  useEventListener(
    'keyup',
    keyHandler('ArrowUp', pipe(prevFocusNode, domElementById, focus)),
    treeRef
  )
  useEventListener(
    'keyup',
    keyHandler(
      'ArrowRight',
      pipe(curFocusNode, n => n && (n.open = true))
    ),
    treeRef
  )
  useEventListener(
    'keyup',
    keyHandler(
      'ArrowLeft',
      pipe(curFocusNode, n => n && (n.open = false))
    ),
    treeRef
  )

  return (
    <div ref={treeRef}>
      <VisualNodeTemplate node={visualTree} depth={0}>
        {children}
      </VisualNodeTemplate>
    </div>
  )
}

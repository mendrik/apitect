import { useStore } from 'effector-react'
import { path, pipe, prop, propEq, when } from 'ramda'
import React, { FC, useMemo, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

import { TreeNode } from '../../shared/algebraic/treeNode'
import { UiNode } from '../../shared/types/domain/tree'
import { Maybe } from '../../shared/types/generic'
import { next } from '../../shared/utils/ramda'
import appStore from '../../stores/appStore'
import { domElementById, focus } from '../../utils/focus'
import { VisualNode, VisualNodeTemplate } from './VisualNodeTemplate'

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

  // prettier-ignore
  const nextNode = (): Maybe<VisualNode> => {
    const list =
      visualTree.reduceAlt(
        (acc, n) => n.value.open ? [...acc, n] : acc,
        [] as TreeNode<VisualNode>[]
      ).flatMap(prop('children')).map(prop('value')) ?? []
    const id = document.activeElement?.id
    return next(propEq('id', id))(list)
  }

  const arrowDown = when(propEq<any>('key', 'ArrowDown'), pipe(nextNode, domElementById, focus))

  useEventListener('keyup', arrowDown, treeRef)

  return (
    <div ref={treeRef}>
      <VisualNodeTemplate node={visualTree} depth={0}>
        {children}
      </VisualNodeTemplate>
    </div>
  )
}

import { useStore } from 'effector-react'
import React, { FC, useMemo, useState } from 'react'

import { TreeNode } from '../../shared/algebraic/treeNode'
import { UiNode } from '../../shared/types/domain/tree'
import appStore from '../../stores/appStore'
import { VisualNode, VisualNodeTemplate } from './VisualNodeTemplate'

export const VisualTree: FC = ({ children }) => {
  const { tree } = useStore(appStore)
  const [, forceRender] = useState(false)

  const visualTree = useMemo(() => {
    const t = TreeNode.from<UiNode, 'children'>('children')(tree)
    return t.map(
      t =>
        new Proxy<VisualNode>(
          {
            name: t.name,
            open: false
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

  return (
    <VisualNodeTemplate node={visualTree} depth={0}>
      {children}
    </VisualNodeTemplate>
  )
}

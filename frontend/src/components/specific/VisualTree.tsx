import { useStore } from 'effector-react'
import { cond, propEq } from 'ramda'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import React, { useMemo } from 'react'

import {
  deleteNodeFx,
  newNodeFx,
  nodeSettingsFx,
  openNodeState,
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
  const { tree, selectedNode } = useStore($appStore)
  const root = useMemo(() => TreeNode.from<Node, 'children'>('children')(tree), [tree])

  useDefinedEffect(node => focus(document.getElementById(node.value.id)), selectedNode)

  const [ConfirmModal, confirmDelete] = useConfirmation(
    'common.questions.delete',
    () => selectedNode && deleteNodeFx(selectedNode.value.id)
  )

  const setOpen = (toggle: boolean) => (ev: Event) => {
    if (selectedNode != null) {
      if (isNotNilOrEmpty(selectedNode?.children)) {
        ev.stopPropagation()
      }
      openNodeState([selectedNode, toggle])
    }
  }

  const keyMap = cond([
    [propEq('key', 'ArrowRight'), setOpen(true)],
    [propEq('key', 'ArrowLeft'), setOpen(false)],
    [propEq('key', 'Delete'), confirmDelete],
    [propEq('key', 'n'), pd(() => newNodeFx(selectedNode?.value))],
    [propEq('key', 'Enter'), pd(() => selectedNode && nodeSettingsFx(selectedNode.value.id))],
    [propEq('code', 'Escape'), pd(() => selectNode(undefined))]
  ])

  return (
    <div onKeyDown={keyMap} id="doc-tree">
      <VisualNodeTemplate node={root}>{children}</VisualNodeTemplate>
      <ConfirmModal />
    </div>
  )
}

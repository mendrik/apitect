import { useStore } from 'effector-react'
import { cond, propEq } from 'ramda'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import React from 'react'

import {
  deleteNodeFx,
  newNodeFx,
  nodeSettingsFx,
  openNodeState,
  selectNode
} from '../../events/tree'
import { useConfirmation } from '../../hooks/useConfirmation'
import { useDefinedEffect } from '../../hooks/useDefinedEffect'
import { $selectedNode } from '../../stores/$selectedNode'
import { $treeStore } from '../../stores/$treeStore'
import { focus } from '../../utils/focus'
import { preventDefault as pd } from '../../utils/preventDefault'
import { VisualNodeTemplate } from './VisualNodeTemplate'

export const VisualTree = () => {
  const selectedNode = useStore($selectedNode)
  const root = useStore($treeStore)

  useDefinedEffect(sn => {
    focus(document.getElementById(sn.value.id))
  }, selectedNode)

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
    [propEq('code', 'Escape'), pd(() => selectNode(null))]
  ])

  return (
    <div onKeyDown={keyMap} id="doc-tree">
      <VisualNodeTemplate node={root} />
      <ConfirmModal />
    </div>
  )
}

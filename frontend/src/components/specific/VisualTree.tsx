import { useStore } from 'effector-react'
import { cond } from 'ramda'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import React, { SyntheticEvent } from 'react'
import { useConfirmation } from '~hooks/useConfirmation'
import { useDefinedEffect } from '~hooks/useDefinedEffect'
import '~stores/$enumsStore'
import { $selectedNode } from '~stores/$selectedNode'
import { $treeStore } from '~stores/$treeStore'

import {
  deleteNodeFx,
  newNodeFx,
  nodeSettingsFx,
  openNodeState,
  selectNode
} from '../../events/tree'
import { codeIs, keyIs } from '../../utils/eventUtils'
import { focus } from '../../utils/focus'
import { preventDefault as pd } from '../../utils/preventDefault'
import { VisualNode } from './VisualNode'

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

  const setOpen = (toggle: boolean) => (ev: SyntheticEvent) => {
    if (selectedNode != null) {
      if (isNotNilOrEmpty(selectedNode?.children)) {
        ev.stopPropagation()
      }
      openNodeState([selectedNode, toggle])
    }
  }

  const keyMap = cond([
    [keyIs('ArrowRight'), setOpen(true)],
    [keyIs('ArrowLeft'), setOpen(false)],
    [keyIs('Delete'), confirmDelete],
    [keyIs('n'), pd(() => newNodeFx(selectedNode?.value))],
    [keyIs('Enter'), pd(() => selectedNode && nodeSettingsFx(selectedNode.value.id))],
    [codeIs('Escape'), pd(() => selectNode(null))]
  ])

  return (
    <div onKeyDown={keyMap} id="doc-tree">
      <VisualNode node={root} />
      <ConfirmModal />
    </div>
  )
}

import { useStore } from 'effector-react'
import { always, both, cond } from 'ramda'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import React, { SyntheticEvent } from 'react'
import { useConfirmation } from '~hooks/useConfirmation'
import { useDefinedEffect } from '~hooks/useDefinedEffect'
import '~stores/$enumsStore'
import { $canCreateNode, $selectedNode } from '~stores/$selectedNode'
import { $treeStore } from '~stores/$treeStore'

import {
  deleteNodeFx,
  newNodeFx,
  nodeSettingsFx,
  openNodeState,
  selectNode
} from '../../events/tree'
import { codeIn, keyIn, withoutModkey } from '../../utils/eventUtils'
import { focus } from '../../utils/focus'
import { preventDefault as pd } from '../../utils/preventDefault'
import { VisualNode } from './VisualNode'

export const VisualTree = () => {
  const selectedNode = useStore($selectedNode)
  const root = useStore($treeStore)
  const canCreateNode = useStore($canCreateNode)

  useDefinedEffect(sn => {
    focus(document.getElementById(sn.value.id))
  }, selectedNode)

  const [DeleteModal, confirmDelete] = useConfirmation(
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
    [both(keyIn('ArrowRight'), withoutModkey), setOpen(true)],
    [both(keyIn('ArrowLeft'), withoutModkey), setOpen(false)],
    [keyIn('Delete'), confirmDelete],
    [both(always(canCreateNode), keyIn('n')), pd(() => newNodeFx(selectedNode?.value))],
    [keyIn('Enter'), pd(() => selectedNode && nodeSettingsFx(selectedNode.value.id))],
    [codeIn('Escape'), pd(() => selectNode(null))]
  ])

  return (
    <div onKeyDown={keyMap} id="doc-tree">
      <VisualNode node={root} />
      <DeleteModal />
    </div>
  )
}

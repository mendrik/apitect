import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import { always, both, cond } from 'ramda'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import { SyntheticEvent } from 'react'
import { useConfirmation } from '~hooks/useConfirmation'
import '~stores/$enumsStore'
import { $canCreateNode, $selectedNode } from '~stores/$selectedNode'
import { $treeStore } from '~stores/$treeStore'

import {
  deleteNodeFx,
  newNodeFx,
  nodeSettingsFx,
  openNodeState,
  selectNode
} from '../../../events/tree'
import { codeIn, keyIn, withoutModkey } from '../../../utils/eventUtils'
import { preventDefault as pd } from '../../../utils/preventDefault'
import { DraggedNode } from '../node/DraggedNode'
import { VisualNode } from '../node/VisualNode'
import { snapToNode } from '../utils/snapToNode'
import { useDnd } from './useDnD'

export const VisualTree = () => {
  const selectedNode = useStore($selectedNode)
  const root = useStore($treeStore)
  const canCreateNode = useStore($canCreateNode)

  const { draggedNode, ...dnd } = useDnd(root)

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
    [both(always(canCreateNode), keyIn('n')), pd(() => newNodeFx(selectedNode))],
    [keyIn('Enter'), pd(() => selectedNode && nodeSettingsFx(selectedNode.value.id))],
    [codeIn('Escape'), pd(() => selectNode(null))]
  ])

  return (
    <div onKeyDown={keyMap} id="doc-tree">
      <DndContext {...dnd}>
        <VisualNode node={root} />
        <DragOverlay modifiers={[snapToNode]} dropAnimation={null}>
          {draggedNode && <DraggedNode node={draggedNode} />}
        </DragOverlay>
      </DndContext>
      <DeleteModal />
    </div>
  )
}

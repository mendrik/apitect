import {
  closestCenter,
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  MouseSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { DragStartEvent } from '@dnd-kit/core/dist/types'
import { useStore } from 'effector-react'
import { always, both, cond, propEq } from 'ramda'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import { SyntheticEvent, useState } from 'react'
import { useConfirmation } from '~hooks/useConfirmation'
import { useDefinedEffect } from '~hooks/useDefinedEffect'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
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

const measuring = {
  droppable: { strategy: MeasuringStrategy.Always }
}

export const VisualTree = () => {
  const selectedNode = useStore($selectedNode)
  const root = useStore($treeStore)
  const canCreateNode = useStore($canCreateNode)
  const [draggedNode, setDraggedNode] = useState<TreeNode<Node> | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )

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

  const handleNodeDrop = () => {
    // eslint-disable-next-line no-console
    console.log('drop')
  }

  const handleNodeDrag = (ev: DragStartEvent) => {
    const first = root.first(propEq('id', ev.active.id))
    setDraggedNode(first ?? null)
  }

  return (
    <div onKeyDown={keyMap} id="doc-tree">
      <DndContext
        onDragEnd={handleNodeDrop}
        onDragStart={handleNodeDrag}
        sensors={sensors}
        collisionDetection={closestCenter}
        measuring={measuring}
        autoScroll
      >
        <VisualNode node={root} />
        <DragOverlay>
          {draggedNode && (
            <div className="bg-white bg-opacity-75 border border-1 rounded border-dotted">
              <VisualNode node={draggedNode} passive />
            </div>
          )}
        </DragOverlay>
      </DndContext>
      <DeleteModal />
    </div>
  )
}

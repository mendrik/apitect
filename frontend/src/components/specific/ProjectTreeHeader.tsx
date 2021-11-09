import { IconEdit, IconFolderOff, IconFolderPlus, IconTrash } from '@tabler/icons'
import { useStore } from 'effector-react'
import React, { FC } from 'react'

import { openModal } from '../../events/modals'
import { deselectNode } from '../../events/tree'
import appStore from '../../stores/appStore'
import { preventDefault } from '../../utils/preventDefault'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

export const ProjectTreeHeader: FC = () => {
  const { selectedNode } = useStore(appStore)
  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div className="text-truncate editable">Project tree</div>
      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        <Icon icon={IconTrash} disabled={selectedNode == null} />
        <Icon icon={IconFolderOff} onClick={() => deselectNode()} disabled={selectedNode == null} />
        <WithTooltip tooltipText="Create a new node">
          <Icon icon={IconFolderPlus} onPointerDown={preventDefault(() => openModal('new-node'))} />
        </WithTooltip>
        <Icon icon={IconEdit} disabled={selectedNode == null} />
      </div>
    </Tuple>
  )
}

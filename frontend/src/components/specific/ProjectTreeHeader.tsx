import { IconEdit, IconFolderPlus, IconTrash } from '@tabler/icons'
import { useStore } from 'effector-react'
import React, { FC } from 'react'

import { openModal } from '../../events/modals'
import { deleteNode } from '../../events/tree'
import $appStore from '../../stores/$appStore'
import { HGrid } from '../generic/HGrid'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

export const ProjectTreeHeader: FC = () => {
  const { selectedNode } = useStore($appStore)
  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div className="text-truncate editable">Project tree</div>
      <HGrid>
        <WithTooltip tooltipText="Delete selected node" shortcut="Del">
          <Icon
            icon={IconTrash}
            onClick={() => deleteNode(selectedNode!)}
            disabled={selectedNode == null}
          />
        </WithTooltip>
        <WithTooltip tooltipText="Create a new node" shortcut="N">
          <Icon icon={IconFolderPlus} onClick={() => openModal('new-node')} />
        </WithTooltip>
        <WithTooltip tooltipText="Edit" shortcut="E">
          <Icon icon={IconEdit} disabled={selectedNode == null} />
        </WithTooltip>
      </HGrid>
    </Tuple>
  )
}

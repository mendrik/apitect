import { IconFolderPlus, IconSettings, IconTrash } from '@tabler/icons'
import { useStore } from 'effector-react'
import React from 'react'

import { openModal } from '../../events/modals'
import { deleteNode } from '../../events/tree'
import { ModalNames } from '../../shared/types/modals'
import $appStore from '../../stores/$appStore'
import { HGrid } from '../generic/HGrid'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

export const ProjectTreeHeader = () => {
  const { selectedNode } = useStore($appStore)
  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div className="text-truncate">Project tree</div>
      <HGrid>
        <WithTooltip tooltipText="Delete selected node" shortcut="Del">
          <Icon
            icon={IconTrash}
            onClick={() => deleteNode(selectedNode!.id)}
            disabled={selectedNode == null}
          />
        </WithTooltip>
        <WithTooltip tooltipText="Create a new node" shortcut="N">
          <Icon icon={IconFolderPlus} onClick={() => openModal(ModalNames.NEW_NODE)} />
        </WithTooltip>
        <WithTooltip tooltipText="Settings" shortcut="Enter">
          <Icon
            icon={IconSettings}
            disabled={selectedNode == null}
            onClick={() => openModal(ModalNames.NODE_SETTINGS)}
          />
        </WithTooltip>
      </HGrid>
    </Tuple>
  )
}

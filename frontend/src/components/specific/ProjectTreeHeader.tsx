import { IconEdit, IconFolderOff, IconFolderPlus, IconTrash } from '@tabler/icons'
import { useStore } from 'effector-react'
import React, { FC } from 'react'

import { openModal } from '../../events/modals'
import { deselectNode } from '../../events/tree'
import $appStore from '../../stores/$appStore'
import { HGrid } from '../generic/HGrid'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

export const ProjectTreeHeader: FC = () => {
  const { selectedNode, sendMessage } = useStore($appStore)
  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div className="text-truncate editable">Project tree</div>
      <HGrid>
        <Icon
          icon={IconTrash}
          onClick={() => sendMessage({ type: 'DEL_NODE', id: selectedNode!.id })}
          disabled={selectedNode == null}
        />
        <Icon icon={IconFolderOff} onClick={() => deselectNode()} disabled={selectedNode == null} />
        <WithTooltip tooltipText="Create a new node">
          <Icon icon={IconFolderPlus} onClick={() => openModal('new-node')} />
        </WithTooltip>
        <Icon icon={IconEdit} disabled={selectedNode == null} />
      </HGrid>
    </Tuple>
  )
}

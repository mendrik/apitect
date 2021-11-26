import { IconFileImport, IconFolderPlus, IconSettings, IconTrash, IconUpload } from '@tabler/icons'
import { useStore } from 'effector-react'
import React from 'react'

import { deleteNodeFx, newNodeFx, nodeSettingsFx } from '../../events/tree'
import $appStore from '../../stores/$appStore'
import { HGrid } from '../generic/HGrid'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

export const ProjectTreeHeader = () => {
  const { selectedNode } = useStore($appStore)
  const { document } = useStore($appStore)
  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div className="text-truncate">{document.name}</div>
      <HGrid>
        <WithTooltip tooltipText="Import" shortcut="I">
          <Icon icon={IconFileImport} />
        </WithTooltip>
        <WithTooltip tooltipText="Delete selected node" shortcut="Del">
          <Icon
            icon={IconTrash}
            onClick={() => deleteNodeFx(selectedNode!.value.id)}
            disabled={selectedNode == null}
          />
        </WithTooltip>
        <WithTooltip tooltipText="Create a new node" shortcut="N">
          <Icon icon={IconFolderPlus} onClick={() => newNodeFx(selectedNode?.value)} />
        </WithTooltip>
        <WithTooltip tooltipText="Node settings" shortcut="Enter">
          <Icon
            icon={IconSettings}
            disabled={selectedNode == null}
            onClick={() => nodeSettingsFx(selectedNode!.value.id)}
          />
        </WithTooltip>
      </HGrid>
    </Tuple>
  )
}

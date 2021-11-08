import { IconFileImport, IconFolderOff, IconFolderPlus, IconTrash } from '@tabler/icons'
import React, { FC } from 'react'

import { openModal } from '../../events/modals'
import { preventDefault } from '../../utils/preventDefault'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

export const ProjectTreeHeader: FC = () => (
  <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
    <div className="text-truncate">Project tree</div>
    <div className="d-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
      <WithTooltip tooltipText="Create a new node">
        <Icon icon={IconFolderPlus} onPointerDown={preventDefault(() => openModal('new-node'))} />
      </WithTooltip>
      <Icon icon={IconFolderOff} />
      <Icon icon={IconTrash} />
      <Icon icon={IconFileImport} />
    </div>
  </Tuple>
)

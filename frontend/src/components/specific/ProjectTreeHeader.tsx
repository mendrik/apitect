import { IconFileImport, IconFolderPlus, IconMenu2 } from '@tabler/icons'
import React, { FC } from 'react'

import { openModal } from '../../events/modals'
import { preventDefault } from '../../utils/preventDefault'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'

export const ProjectTreeHeader: FC = () => (
  <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
    <div className="text-truncate">Project tree</div>
    <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
      <Icon
        icon={IconFolderPlus}
        focus={false}
        tooltipText="Create a new node"
        onPointerDown={preventDefault(() => openModal('new-node'))}
      />
      <Icon icon={IconFileImport} />
    </div>
  </Tuple>
)

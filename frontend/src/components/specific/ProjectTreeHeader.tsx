import { IconMenu2, IconSearch, IconCirclePlus, IconInfoCircle } from '@tabler/icons'
import React, { FC } from 'react'

import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'

export const ProjectTreeHeader: FC = () => (
  <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
    <div>Project tree</div>
    <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
      <Icon icon={IconInfoCircle} className="gray-icon" />
      <Icon icon={IconMenu2} className="gray-icon" />
    </div>
  </Tuple>
)

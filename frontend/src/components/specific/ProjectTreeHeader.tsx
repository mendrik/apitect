import { IconMenu2 } from '@tabler/icons'
import React, { FC } from 'react'

import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'

export const ProjectTreeHeader: FC = () => (
  <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
    <div>Project tree</div>
    <Icon icon={IconMenu2} />
  </Tuple>
)

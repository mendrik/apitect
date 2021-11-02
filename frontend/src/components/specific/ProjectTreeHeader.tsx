import React, { FC } from 'react'
import { Menu } from 'react-feather'

import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'

export const ProjectTreeHeader: FC = () => (
  <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
    <div>Project tree</div>
    <Icon icon={Menu} />
  </Tuple>
)

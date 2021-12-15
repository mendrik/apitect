import { TablerIcon as IconProp } from '@tabler/icons'
import React, { HTMLAttributes } from 'react'
import { Jsx } from '~shared/types/generic'

import { Palette } from '../../css/colors'

export type OwnProps = {
  icon: IconProp
} & HTMLAttributes<HTMLOrSVGElement>

export const SimpleIcon = ({ icon: IconCmp, ...props }: Jsx<OwnProps>) => (
  <IconCmp
    stroke={0.5}
    size={20}
    tabIndex={-1}
    focusable="false"
    color={Palette.iconBorder.toString()}
    className="cursor-pointer user-select-none"
    {...props}
  />
)

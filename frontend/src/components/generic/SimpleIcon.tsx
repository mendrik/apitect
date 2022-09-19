import { TablerIcon as IconProp } from '@tabler/icons'
import { HTMLAttributes } from 'react'

import { Palette } from '../../css/colors'

export type OwnProps = {
  icon: IconProp
  size?: number
  stroke?: number
} & HTMLAttributes<HTMLOrSVGElement>

export const SimpleIcon = ({ icon: IconCmp, stroke = 0.5, size = 20, ...props }: OwnProps) => (
  <IconCmp
    stroke={stroke}
    size={size}
    tabIndex={-1}
    focusable="false"
    color={Palette.iconBorder.toString()}
    className="cursor-pointer user-select-none icon-hover"
    {...props}
  />
)

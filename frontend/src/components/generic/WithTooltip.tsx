import React, { ReactNode } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import { Jsx } from '../../shared/types/generic'

type OwnProps = {
  tooltipText: ReactNode
  shortcut?: string
}

export const WithTooltip = ({ tooltipText, shortcut, children }: Jsx<OwnProps>) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip data-shortcut={shortcut}>{tooltipText}</Tooltip>}
    >
      <div>{children}</div>
    </OverlayTrigger>
  )
}

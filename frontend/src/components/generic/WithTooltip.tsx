import React, { FC, ReactNode } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

type OwnProps = {
  tooltipText: ReactNode
  shortcut?: string
}

export const WithTooltip: FC<OwnProps> = ({ tooltipText, shortcut, children }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip data-shortcut={shortcut}>{tooltipText}</Tooltip>}
    >
      <div>{children}</div>
    </OverlayTrigger>
  )
}

import React, { FC } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

type OwnProps = {
  tooltipText: string
}

export const WithTooltip: FC<OwnProps> = ({ tooltipText, children }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip>
          <div className="tc-text">{tooltipText}</div>
        </Tooltip>
      }
    >
      <div>{children}</div>
    </OverlayTrigger>
  )
}

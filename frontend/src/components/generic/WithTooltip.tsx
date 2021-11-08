import React, { FC } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

type OwnProps = {
  tooltipText: string
}

export const WithTooltip: FC<OwnProps> = ({ tooltipText, children }) => {
  return (
    <OverlayTrigger
      defaultShow
      trigger="hover"
      overlay={<Tooltip>{tooltipText}</Tooltip>}
      delay={0}
    >
      <>{children}</>
    </OverlayTrigger>
  )
}

import clsx from 'clsx'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Jsx } from '~shared/types/generic'

type OwnProps = {
  tooltipText: string
  shortcut?: string
}

export const WithTooltip = ({ tooltipText, shortcut, children }: Jsx<OwnProps>) => (
  <OverlayTrigger
    placement="top"
    delay={1000}
    overlay={
      <Tooltip data-shortcut={shortcut} className={clsx({ shortcut })}>
        {tooltipText}
      </Tooltip>
    }
  >
    <div>{children}</div>
  </OverlayTrigger>
)

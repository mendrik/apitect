import { IconCheckbox, IconCirclePlus, IconCopy, IconDeviceFloppy, IconTrash } from '@tabler/icons'
import { useStore } from 'effector-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'
import { $selectedArrayNode, $selectedNode } from '~stores/$selectedNode'

import { Palette } from '../../css/colors'
import { Icon } from '../generic/Icon'
import { WithTooltip } from '../generic/WithTooltip'

type OwnProps = {}

const HeaderSx = styled.div`
  grid-template-rows: 32px;
  grid-template-columns: 24px auto 24px 24px 24px 24px;
  align-items: center;
  border-bottom: 1px solid ${Palette.border};
`

export const ArrayPanelHeader = ({}: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const selectedNode = useStore($selectedArrayNode)
  return (
    <HeaderSx className="d-grid gap-1">
      <WithTooltip tooltipText={t('app.validation')}>
        <Icon icon={IconCheckbox} />
      </WithTooltip>
      <div className="text-truncate">{selectedNode?.value.name}</div>
      <WithTooltip tooltipText={t('app.validation')}>
        <Icon icon={IconCirclePlus} />
      </WithTooltip>
      <WithTooltip tooltipText={t('app.validation')}>
        <Icon icon={IconCopy} />
      </WithTooltip>
      <WithTooltip tooltipText={t('app.validation')}>
        <Icon icon={IconDeviceFloppy} />
      </WithTooltip>
      <WithTooltip tooltipText={t('app.tagSettings')}>
        <Icon icon={IconTrash} />
      </WithTooltip>
    </HeaderSx>
  )
}

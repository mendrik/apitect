import { IconCheckbox, IconTrash } from '@tabler/icons'
import { useStore } from 'effector-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { $selectedArrayItem, $selectedArrayNode } from '~stores/$arrayStores'

import { Palette } from '../../css/colors'
import { Icon } from '../generic/Icon'
import { WithTooltip } from '../generic/WithTooltip'

const HeaderSx = styled.div`
  grid-template-rows: 32px;
  grid-template-columns: 24px auto 24px;
  align-items: center;
  border-bottom: 1px solid ${Palette.border};
`

const ArraySidePanelHeader = () => {
  const { t } = useTranslation()
  const selectedArrayNode = useStore($selectedArrayNode)
  const selectedArrayItem = useStore($selectedArrayItem)
  return (
    <HeaderSx className="d-grid gap-1 px-1">
      <WithTooltip tooltipText={t('app.arrayPanel.selectAll')}>
        <Icon icon={IconCheckbox} />
      </WithTooltip>
      <div className="text-truncate">{selectedArrayNode?.value.name}</div>
      <WithTooltip tooltipText={t('app.arrayPanel.deleteItem')}>
        <Icon icon={IconTrash} disabled={!selectedArrayItem} />
      </WithTooltip>
    </HeaderSx>
  )
}

const ArraySidePanel = () => (
  <div>
    <ArraySidePanelHeader />
    <div>Array</div>
  </div>
)

export { ArraySidePanel }

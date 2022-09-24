import { IconCheckbox, IconTrash } from '@tabler/icons'
import { useStore } from 'effector-react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { $selectedArrayItem } from '~stores/$arrayItemsStore'
import { $selectedArrayNode } from '~stores/$arrayStores'
import { $currentTag } from '~stores/$currentTag'

import { detailsPanelSize, navbarHeight } from '../../constants'
import { Palette } from '../../css/colors'
import { Icon } from '../generic/Icon'
import { WithTooltip } from '../generic/WithTooltip'

const ArraySidePanelSx = styled.div`
  min-width: ${detailsPanelSize}px;
  max-height: calc(100vh - ${navbarHeight}px);
  overflow: hidden;
`

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
  const tag = useStore($currentTag)
  return (
    <HeaderSx className="d-grid gap-1 px-1">
      <WithTooltip tooltipText={t('app.arrayPanel.selectAll')}>
        <Icon icon={IconCheckbox} />
      </WithTooltip>
      <div className="text-truncate">
        {tag?.name} {selectedArrayNode?.value.name}
      </div>
      <WithTooltip tooltipText={t('app.arrayPanel.deleteItem')}>
        <Icon icon={IconTrash} disabled={!selectedArrayItem} />
      </WithTooltip>
    </HeaderSx>
  )
}

const ArraySidePanel = () => (
  <ArraySidePanelSx>
    <ArraySidePanelHeader />
    <div className="p-2">Array</div>
  </ArraySidePanelSx>
)

export { ArraySidePanel }

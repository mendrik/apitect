import { IconCheckbox, IconCirclePlus, IconCopy, IconDeviceFloppy, IconTrash } from '@tabler/icons'
import { useStore } from 'effector-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'
import { $creatingNewArrayItem, $selectedArrayNode } from '~stores/$arrayStores'
import { $selectedArrayItem } from '~stores/$selectedArrayItem'

import { Palette } from '../../css/colors'
import { creatingNewArrayItem } from '../../events/array'
import { Icon } from '../generic/Icon'
import { WithTooltip } from '../generic/WithTooltip'

type OwnProps = {}

const HeaderSx = styled.div`
  grid-template-rows: 32px;
  grid-template-columns: 24px auto 24px 24px 24px;
  align-items: center;
  border-bottom: 1px solid ${Palette.border};
`

export const ArrayPanelHeader = ({}: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const selectedArrayNode = useStore($selectedArrayNode)
  const selectedArrayItem = useStore($selectedArrayItem)
  const creating = useStore($creatingNewArrayItem)
  return (
    <HeaderSx className="d-grid gap-1 px-1">
      <WithTooltip tooltipText={t('app.arrayPanel.selectAll')}>
        <Icon icon={IconCheckbox} />
      </WithTooltip>
      <div className="text-truncate">{selectedArrayNode?.value.name}</div>
      <WithTooltip tooltipText={t('app.arrayPanel.newItem')}>
        {creating ? (
          <Icon icon={IconDeviceFloppy} onClick={() => creatingNewArrayItem(true)} />
        ) : (
          <Icon icon={IconCirclePlus} onClick={() => creatingNewArrayItem(true)} />
        )}
      </WithTooltip>
      <WithTooltip tooltipText={t('app.arrayPanel.copyItem')}>
        <Icon icon={IconCopy} disabled={!selectedArrayItem} />
      </WithTooltip>
      <WithTooltip tooltipText={t('app.arrayPanel.deleteItem')}>
        <Icon icon={IconTrash} disabled={!selectedArrayItem} />
      </WithTooltip>
    </HeaderSx>
  )
}

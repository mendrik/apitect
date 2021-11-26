import { IconColumns, IconDownload, IconSettings } from '@tabler/icons'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Tag } from '../../shared/types/domain/tag'
import { Jsx } from '../../shared/types/generic'
import { HGrid } from '../generic/HGrid'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

type OwnProps = {
  name: string
  tag?: Tag
}

export const ColumnHeader = ({ name, tag }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div className="text-truncate">{name}</div>
      <HGrid>
        {tag == null ? (
          <WithTooltip tooltipText={t('app.tags')}>
            <Icon icon={IconColumns} />
          </WithTooltip>
        ) : (
          <WithTooltip tooltipText={t('app.tagSettings')}>
            <Icon icon={IconSettings} />
          </WithTooltip>
        )}
        <WithTooltip tooltipText={t('app.download')}>
          <Icon icon={IconDownload} />
        </WithTooltip>
      </HGrid>
    </Tuple>
  )
}

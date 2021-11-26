import { IconColumns } from '@tabler/icons'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Jsx } from '../../shared/types/generic'
import { HGrid } from '../generic/HGrid'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

type OwnProps = {
  name: string
  showColumnsIcon?: boolean
}

export const ColumnHeader = ({ name, showColumnsIcon = false }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div className="text-truncate">{name}</div>
      <HGrid>
        {showColumnsIcon && (
          <WithTooltip tooltipText={t('app.tags')}>
            <Icon icon={IconColumns} />
          </WithTooltip>
        )}
      </HGrid>
    </Tuple>
  )
}

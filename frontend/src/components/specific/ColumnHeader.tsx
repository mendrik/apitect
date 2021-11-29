import { IconColumns, IconDownload, IconSettings, IconShieldCheck } from '@tabler/icons'
import { useStore } from 'effector-react'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { userSettingsFx } from '../../events/user'
import { Tag } from '../../shared/types/domain/tag'
import { Jsx } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'
import { HGrid } from '../generic/HGrid'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

type OwnProps = {
  name: string
  tag?: Tag
}

export const ColumnHeader = ({ name, tag }: Jsx<OwnProps>) => {
  const { tags } = useStore($appStore)
  const { t } = useTranslation()
  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div className="text-truncate">{name}</div>
      <HGrid>
        <WithTooltip tooltipText={t('app.validation')}>
          <Icon icon={IconShieldCheck} onClick={() => userSettingsFx()} />
        </WithTooltip>
        {tag == null ? (
          isNotNilOrEmpty(tags) && (
            <WithTooltip tooltipText={t('app.tags')}>
              <Icon icon={IconColumns} onClick={() => userSettingsFx()} />
            </WithTooltip>
          )
        ) : (
          <WithTooltip tooltipText={t('app.tagSettings')}>
            <Icon icon={IconSettings} />
          </WithTooltip>
        )}
      </HGrid>
    </Tuple>
  )
}

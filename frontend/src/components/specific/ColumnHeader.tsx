import { IconColumns, IconSettings, IconShieldCheck } from '@tabler/icons'
import { useStore } from 'effector-react'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { tagSettingsFx } from '../../events/project'
import { userSettingsFx } from '../../events/user'
import { Tag } from '../../shared/types/domain/tag'
import { Jsx } from '../../shared/types/generic'
import { $tagStore } from '../../stores/$tagStore'
import { HGrid } from '../generic/HGrid'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

type OwnProps = {
  name: string
  tag?: Tag
}

export const ColumnHeader = ({ name, tag }: Jsx<OwnProps>) => {
  const { tags } = useStore($tagStore)
  const { t } = useTranslation()
  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div className="text-truncate">{name}</div>
      <HGrid>
        <WithTooltip tooltipText={t('app.validation')}>
          <Icon icon={IconShieldCheck} />
        </WithTooltip>
        {tag == null ? (
          isNotNilOrEmpty(tags) && (
            <WithTooltip tooltipText={t('app.tags')}>
              <Icon icon={IconColumns} onClick={() => userSettingsFx()} />
            </WithTooltip>
          )
        ) : (
          <WithTooltip tooltipText={t('app.tagSettings')}>
            <Icon icon={IconSettings} onClick={() => tagSettingsFx(tag.name)} />
          </WithTooltip>
        )}
      </HGrid>
    </Tuple>
  )
}

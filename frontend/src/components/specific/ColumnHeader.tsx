import { IconSettings, IconShieldCheck } from '@tabler/icons'
import { useTranslation } from 'react-i18next'
import { Tag } from '~shared/types/domain/tag'

import { tagSettingsFx } from '../../events/tagSettings'
import { HGrid } from '../generic/HGrid'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

type OwnProps = {
  name: string
  tag: Tag
}

export const ColumnHeader = ({ name, tag }: OwnProps) => {
  const { t } = useTranslation()
  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div className="text-truncate">{name}</div>
      <HGrid>
        <WithTooltip tooltipText={t('app.validation')}>
          <Icon icon={IconShieldCheck} />
        </WithTooltip>
        <WithTooltip tooltipText={t('app.tagSettings')}>
          <Icon icon={IconSettings} onClick={() => tagSettingsFx(tag.name)} />
        </WithTooltip>
      </HGrid>
    </Tuple>
  )
}

import { useStore } from 'effector-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Value } from '../../shared/types/domain/values/value'
import { NodeSettings } from '../../shared/types/forms/nodetypes/nodeSettings'
import { Jsx, Maybe } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'

type OwnProps = {
  value: Value | undefined
}

export const VisualValue = ({ value }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const { nodeSettings } = useStore($appStore)
  const setting: Maybe<NodeSettings> = nodeSettings[value?.nodeId ?? '']

  return <div>{value?.nodeType}</div>
}

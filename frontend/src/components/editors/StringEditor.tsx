import React from 'react'
import { useTranslation } from 'react-i18next'

import { Node } from '../../shared/types/domain/node'
import { StringValue } from '../../shared/types/domain/values/stringValue'
import { StringSettings } from '../../shared/types/forms/nodetypes/stringSettings'
import { Jsx, Maybe } from '../../shared/types/generic'

type OwnProps = {
  node: Node
  settings: Maybe<StringSettings>
  value?: Maybe<StringValue>
}

export const StringEditor = ({ node, settings, value }: Jsx<OwnProps>) => {
  const { t } = useTranslation()

  return <div className="text-truncate">Lorem impsum dolor sit omenia bellum gallicum</div>
}

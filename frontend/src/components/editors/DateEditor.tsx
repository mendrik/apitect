import { useStore } from 'effector-react'
import React, { ChangeEvent } from 'react'
import { NodeType } from '~shared/types/domain/nodeType'
import { DateValue } from '~shared/types/domain/values/dateValue'
import { getStringValidator } from '~shared/types/domain/values/stringValue'
import { StringSettings } from '~shared/types/forms/nodetypes/stringSettings'
import { Jsx } from '~shared/types/generic'

import { valueUpdateFx } from '../../events/values'
import { $nodeSettings } from '../../stores/$nodeSettingsStore'
import { EditorProps } from '../specific/VisualValue'

export const DateEditor = ({ value, node, tag, loading }: Jsx<EditorProps<DateValue>>) => {
  const nodeSettings = useStore($nodeSettings)
  const nodeSetting = nodeSettings[node.id] as StringSettings
  const validator = getStringValidator(nodeSetting)

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) =>
    valueUpdateFx({
      value: ev.target.checked,
      nodeId: node.id,
      tag,
      nodeType: NodeType.Boolean
    })

  return <div tabIndex={0}>12.05.2021</div>
}

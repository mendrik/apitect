import React, { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import { NodeType } from '~shared/types/domain/nodeType'
import { BooleanValue } from '~shared/types/domain/values/booleanValue'
import { Jsx } from '~shared/types/generic'

import { valueUpdateFx } from '../../events/values'
import { EditorProps } from '../specific/VisualValue'

export const BooleanEditor = ({ value, node, tag }: Jsx<EditorProps<BooleanValue>>) => {
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) =>
    valueUpdateFx({
      value: ev.target.checked,
      nodeId: node.id,
      tag,
      nodeType: NodeType.Boolean
    })

  return <Form.Check type="switch" checked={value?.value} onChange={handleChange} />
}

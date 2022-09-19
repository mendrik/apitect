import { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import { NodeType } from '~shared/types/domain/nodeType'
import { BooleanValue } from '~shared/types/domain/values/booleanValue'

import { valueUpdateFx } from '../../events/values'
import { Placeholder } from '../generic/Placeholder'
import { EditorProps } from '../specific/VisualValue'

export const BooleanEditor = ({ value, node, tag, loading }: EditorProps<BooleanValue>) => {
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) =>
    valueUpdateFx({
      value: ev.target.checked,
      nodeId: node.id,
      tag,
      nodeType: NodeType.Boolean
    })

  return loading ? (
    <Placeholder.Value nodeId={node.id} />
  ) : (
    <Form.Check
      type="switch"
      checked={value?.value ?? false}
      onChange={handleChange}
      style={{ marginLeft: 3 }}
    />
  )
}

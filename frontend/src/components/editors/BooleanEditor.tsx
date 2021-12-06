import React, { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import { BooleanValue } from '~shared/types/domain/values/booleanValue'
import { Jsx } from '~shared/types/generic'

import { EditorProps } from '../specific/VisualValue'

export const BooleanEditor = ({ value, save }: Jsx<EditorProps<BooleanValue>>) => {
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => save(ev.target.checked)
  return <Form.Check type="switch" defaultChecked={value?.value} onChange={handleChange} />
}

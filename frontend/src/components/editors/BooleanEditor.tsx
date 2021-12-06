import { cond, propEq } from 'ramda'
import React, { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import { BooleanValue } from '~shared/types/domain/values/booleanValue'
import { Jsx } from '~shared/types/generic'

import { EditorProps } from '../specific/VisualValue'

export const BooleanEditor = ({ value, save }: Jsx<EditorProps<BooleanValue>>) => {
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => save(ev.target.checked)

  const keyMap = cond([[propEq('key', 'Space'), (e: Event) => console.log(e)]])

  return (
    <Form.Check
      type="switch"
      defaultChecked={value?.value}
      onKeyDown={keyMap}
      onChange={handleChange}
    />
  )
}

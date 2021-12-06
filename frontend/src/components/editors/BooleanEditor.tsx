import { cond, propEq } from 'ramda'
import React, { ChangeEvent, KeyboardEvent } from 'react'
import { Form } from 'react-bootstrap'
import { BooleanValue } from '~shared/types/domain/values/booleanValue'
import { Jsx } from '~shared/types/generic'

import { stopPropagation } from '../../utils/stopPropagation'
import { EditorProps } from '../specific/VisualValue'

export const BooleanEditor = ({ value, save }: Jsx<EditorProps<BooleanValue>>) => {
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => save(ev.target.checked)

  const keyMap = cond([
    [
      propEq('code', 'Space'),
      (ev: KeyboardEvent<HTMLInputElement>) => save(!(ev.target as HTMLInputElement).checked)
    ]
  ])

  return (
    <Form.Check
      type="switch"
      checked={value?.value}
      onKeyDown={stopPropagation(keyMap)}
      onChange={handleChange}
    />
  )
}

import React from 'react'
import { Form } from 'react-bootstrap'
import { Jsx } from '~shared/types/generic'

import { EditorProps } from '../specific/VisualValue'

export const BooleanEditor = ({ node, value }: Jsx<EditorProps>) => {
  return <Form.Check type="switch" />
}

import React from 'react'

import { Jsx } from '../../shared/types/generic'
import { EditorProps } from '../specific/VisualValue'

export const StringEditor = ({ node, settings, value }: Jsx<EditorProps>) => (
  <input type="text" className="editor" autoFocus placeholder={node.name} />
)

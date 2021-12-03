import { identity, juxt } from 'ramda'
import React, { KeyboardEvent } from 'react'

import { Jsx } from '../../shared/types/generic'
import { EditorProps } from '../specific/VisualValue'

export const StringEditor = ({
  node,
  settings,
  value,
  children,
  onKeyDown = identity,
  ...props
}: Jsx<EditorProps>) => {
  const test = (ev: KeyboardEvent) => {
    console.log(ev)
  }
  return (
    <input
      type="text"
      className="editor"
      autoFocus
      placeholder={node.name}
      onKeyDown={juxt([onKeyDown, test])}
      {...props}
    />
  )
}

import { cond, propEq } from 'ramda'
import type { KeyboardEvent } from 'react'
import React from 'react'
import { Jsx } from '~shared/types/generic'

import { EditorProps } from '../specific/VisualValue'

export const StringEditor = ({ node, settings, value, children, ...props }: Jsx<EditorProps>) => {
  const save = async (ev: KeyboardEvent<HTMLInputElement>) => {}

  const keyMap = cond([
    [propEq('code', 'ArrowRight'), (e: Event) => e.stopPropagation()],
    [propEq('code', 'ArrowLeft'), (e: Event) => e.stopPropagation()],
    [propEq('key', 'Enter'), save]
  ])

  return (
    <input
      type="text"
      className="editor"
      autoFocus
      placeholder={node.name}
      onKeyDown={keyMap}
      {...props}
    />
  )
}

import { cond, propEq } from 'ramda'
import React from 'react'
import { Jsx } from '~shared/types/generic'

import { EditorProps } from '../specific/VisualValue'

export const StringEditor = ({ node, value }: Jsx<EditorProps>) => {
  const keyMap = cond([
    [propEq('code', 'ArrowRight'), (e: Event) => e.stopPropagation()],
    [propEq('code', 'ArrowLeft'), (e: Event) => e.stopPropagation()]
  ])

  return (
    <input
      type="text"
      className="editor"
      autoFocus
      placeholder={node.name}
      onKeyDown={keyMap}
      value={value?.value}
    />
  )
}

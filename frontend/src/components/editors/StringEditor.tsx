import { cond, propEq } from 'ramda'
import React, { KeyboardEvent } from 'react'
import { StringValue } from '~shared/types/domain/values/stringValue'
import { Jsx } from '~shared/types/generic'

import { EditorProps } from '../specific/VisualValue'

export const StringEditor = ({ node, value, save }: Jsx<EditorProps<StringValue>>) => {
  const attemptSave = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!save(e.currentTarget.value)) {
      e.stopPropagation()
    }
  }

  const keyMap = cond([
    [propEq('key', 'Enter'), attemptSave],
    [propEq('key', 'Tab'), attemptSave],
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
      defaultValue={value?.value}
    />
  )
}

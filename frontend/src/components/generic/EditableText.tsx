import clsx from 'clsx'
import { Effect } from 'effector'
import { cond, F, o, pipe, T } from 'ramda'
import { HTMLAttributes, useState } from 'react'
import { onlyText } from 'react-children-utilities'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { codeIn } from '../../utils/eventUtils'
import { eventValue } from '../../utils/paths'

type OwnProps = {
  editAction: Effect<string, string, Error>
} & HTMLAttributes<HTMLDivElement>

const SeamlessInput = styled.input`
  appearance: none;
  width: 100%;
  border: 0;
  padding: 0;
`

export const EditableText = ({ editAction, children, className, ...rest }: Jsx<OwnProps>) => {
  const [editing, setEditing] = useState(false)
  const stopEditing = o(setEditing, F)
  const startEditing = o(setEditing, T)
  const editingStopped = pipe(eventValue, editAction, stopEditing)

  const keyMap = cond([
    [codeIn('Enter'), editingStopped],
    [codeIn('Escape'), stopEditing]
  ])

  return editing ? (
    <SeamlessInput
      autoFocus
      type="text"
      defaultValue={onlyText(children)}
      onKeyDown={keyMap}
      onBlur={editingStopped}
    />
  ) : (
    <div className={clsx('editable', className)} onClick={startEditing} {...rest}>
      {children}
    </div>
  )
}

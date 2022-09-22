import clsx from 'clsx'
import { Effect } from 'effector'
import { cond, F, o, pipe } from 'ramda'
import { isNotNil } from 'ramda-adjunct'
import { HTMLAttributes, MouseEventHandler, useLayoutEffect, useRef, useState } from 'react'
import { onlyText } from 'react-children-utilities'
import styled from 'styled-components'
import { ArgFn, Jsx } from '~shared/types/generic'

import { getCaretPosition } from '../../utils/caret'
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
  const cursorAt = useRef<number | undefined>(0)
  const stopEditing: ArgFn<any> = o(setEditing, F)
  const div = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const startEditing: MouseEventHandler<HTMLDivElement> = ev => {
    cursorAt.current = getCaretPosition(ev.clientX, ev.clientY)
    setEditing(true)
  }
  const editingStopped = pipe(eventValue, value => editAction(value).then(stopEditing))

  const keyMap = cond([
    [codeIn('Enter'), editingStopped],
    [codeIn('Escape'), stopEditing]
  ])

  useLayoutEffect(() => {
    if (editing && input.current && isNotNil(cursorAt.current)) {
      input.current.setSelectionRange(cursorAt.current, cursorAt.current)
    }
  }, [editing])

  return editing ? (
    <SeamlessInput
      autoFocus
      type="text"
      defaultValue={onlyText(children)}
      onKeyDown={keyMap}
      onBlur={editingStopped}
      ref={input}
    />
  ) : (
    <div className={clsx('editable', className)} onClick={startEditing} ref={div} {...rest}>
      {children}
    </div>
  )
}

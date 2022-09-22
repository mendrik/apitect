import { Effect } from 'effector'
import { pipe, when } from 'ramda'
import { useState } from 'react'
import { onlyText } from 'react-children-utilities'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { codeIn } from '../../utils/eventUtils'
import { eventValue } from '../../utils/paths'

type OwnProps = {
  editAction: Effect<string, string, Error>
}

const SeamlessInput = styled.input`
  appearance: none;
  width: 100%;
  border: 0;
  padding: 0;
`

export const EditableText = ({ editAction, children }: Jsx<OwnProps>) => {
  const [editing, setEditing] = useState(false)
  const editingStopped = pipe(eventValue, editAction, () => setEditing(false))
  return editing ? (
    <SeamlessInput
      autoFocus
      type="text"
      defaultValue={onlyText(children)}
      onKeyDown={when(codeIn('Enter'), editingStopped)}
      onBlur={editingStopped}
    />
  ) : (
    <div className="d-contents editable" onClick={() => setEditing(true)}>
      {children}
    </div>
  )
}

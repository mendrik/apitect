import clsx from 'clsx'
import { converge, pipe } from 'ramda'
import React, { ClipboardEvent, HTMLAttributes, ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'
import { removeSlice } from '~shared/utils/ramda'

import { Palette } from '../../css/colors'
import { futurePasteResult, futureValue, target } from '../../utils/eventUtils'

type OwnProps = {
  className?: string
  initial?: ReactNode
} & HTMLAttributes<HTMLDivElement>

const MeasureSx = styled.div`
  pointer-events: none;
  white-space: nowrap;
  height: 0px;
  padding: 0px 3px;
  width: min-content;
  min-width: 30px;

  ~ input {
    width: calc(100% + 2px);
    padding: initial 3px;
    border: 1px solid transparent;

    &:focus {
      border: 1px dotted ${Palette.iconBorder};
    }
  }
`

export const Autogrow = ({ className, initial, children, ...props }: Jsx<OwnProps>) => {
  const [value, setValue] = useState<ReactNode>(initial)

  const onCut: (e: ClipboardEvent<HTMLInputElement>) => string = converge(removeSlice as any, [
    target.caretPosition,
    target.selectionEnd,
    target.value
  ])

  return (
    <div
      onKeyDown={pipe(futureValue, setValue)}
      onPaste={pipe(futurePasteResult, setValue)}
      onCut={pipe(onCut, setValue)}
      className={clsx('d-grid', className)}
      {...props}
    >
      <MeasureSx>{value}</MeasureSx>
      {children}
    </div>
  )
}

import { cond, propEq } from 'ramda'
import React, { useRef } from 'react'

import { Node } from '../../shared/types/domain/node'
import { StringValue } from '../../shared/types/domain/values/stringValue'
import { StringSettings } from '../../shared/types/forms/nodetypes/stringSettings'
import { Jsx, Maybe } from '../../shared/types/generic'
import { stopPropagation as sp } from '../../utils/stopPropagation'
import { Views, ViewUtils } from '../specific/VisualValue'

type OwnProps = {
  node: Node
  settings: Maybe<StringSettings>
  value?: Maybe<StringValue>
} & ViewUtils

export const StringEditor = ({ node, settings, value, view, displayView }: Jsx<OwnProps>) => {
  const ref = useRef<HTMLInputElement>(null)

  const save = () => {
    displayView()
  }

  const keyMap = cond([
    [propEq('code', 'Escape'), sp(displayView)],
    [propEq('code', 'Enter'), sp(save)]
  ])

  switch (view) {
    case Views.Display:
      return <div className="text-truncate editable w-100">{value}</div>
    case Views.Edit:
      return (
        <input
          type="text"
          className="editor"
          ref={ref}
          onBlur={save}
          onKeyDown={keyMap}
          placeholder={node.name}
        />
      )
  }
}

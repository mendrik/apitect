import { cond, propEq } from 'ramda'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useView } from '../../hooks/useView'
import { Node } from '../../shared/types/domain/node'
import { StringValue } from '../../shared/types/domain/values/stringValue'
import { StringSettings } from '../../shared/types/forms/nodetypes/stringSettings'
import { Jsx, Maybe } from '../../shared/types/generic'
import { stopPropagation as sp } from '../../utils/stopPropagation'

type OwnProps = {
  node: Node
  settings: Maybe<StringSettings>
  value?: Maybe<StringValue>
}

enum Views {
  Display,
  Edit
}

export const StringEditor = ({ node, settings, value }: Jsx<OwnProps>) => {
  const { view, editView, displayView } = useView(Views)
  const ref = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (view === Views.Edit && ref.current != null) {
      ref.current.focus()
    }
  }, [view])

  const save = () => {
    displayView()
  }

  const next = () => {
    // todo: next editor
  }

  const keyMap = cond([
    [propEq('code', 'Escape'), sp(displayView)],
    [propEq('code', 'Enter'), sp(save)],
    [propEq('code', 'Tab'), sp(next)]
  ])

  switch (view) {
    case Views.Display:
      return (
        <div className="text-truncate editable w-100" onClick={editView}>
          {value}
        </div>
      )
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

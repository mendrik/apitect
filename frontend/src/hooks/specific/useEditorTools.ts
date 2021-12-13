import { cond, when } from 'ramda'
import { SyntheticEvent, useState } from 'react'
import styled from 'styled-components'
import { ZodError, ZodSchema } from 'zod'
import { useView } from '~hooks/useView'
import { Node } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { Maybe } from '~shared/types/generic'

import { valueDeleteFx, valueUpdateFx } from '../../events/values'
import { codeIs } from '../../utils/eventUtils'
import { stopPropagation } from '../../utils/stopPropagation'

const lastExecution = {
  time: Date.now()
}

const emptyToUndefined = <T extends Value['value'] | undefined>(str: T): T | undefined =>
  typeof str === 'string' && /^\s*$/.test(str) ? undefined : (str as T)

export enum Views {
  Display,
  Edit
}

export const Text = styled.div`
  white-space: pre;
  width: 100%;
  height: 24px;
  padding-left: 3px;
`

export const useEditorTools = (
  node: Node,
  value: Value | undefined,
  tag: string,
  validator: ZodSchema<any>
) => {
  const views = useView(Views)
  const [error, setError] = useState<Maybe<ZodError>>()

  const saveValue = <T extends Value['value']>(
    formValue: T | undefined,
    e?: SyntheticEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const now = Date.now()
    // make sure that onBlur and onKeyDown don't run this twice
    if (now - lastExecution.time < 20) {
      return
    } else {
      lastExecution.time = now
    }
    setError(undefined)
    const newValue = emptyToUndefined(formValue)

    const result = validator.safeParse(newValue)
    if (value?.value === newValue && result.success) {
      return views.displayView()
    }
    if (result.success) {
      const params = {
        tag,
        nodeId: node.id,
        nodeType: node.nodeType
      }
      void (
        newValue !== undefined
          ? valueUpdateFx({ ...params, value: newValue } as Value)
          : valueDeleteFx(params)
      ).then(views.displayView)
    } else {
      e?.preventDefault()
      e?.stopPropagation()
      setError(result.error)
    }
  }

  const saveFromEvent = (e: SyntheticEvent<HTMLInputElement | HTMLSelectElement>) =>
    saveValue(e.currentTarget.value, e)

  const keyMap = cond([
    [codeIs('ArrowRight', 'ArrowLeft'), when(views.isEditView, stopPropagation)],
    [codeIs('ArrowUp', 'ArrowDown', 'Tab'), saveFromEvent]
  ])

  return {
    saveValue,
    saveFromEvent,
    keyMap,
    error,
    setError,
    views
  }
}

import { cond, propEq, propSatisfies, when } from 'ramda'
import { included } from 'ramda-adjunct'
import { SyntheticEvent, useState } from 'react'
import styled from 'styled-components'
import { ZodError, ZodSchema } from 'zod'
import { useView } from '~hooks/useView'
import { Node } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { StringValue } from '~shared/types/domain/values/stringValue'
import { Value } from '~shared/types/domain/values/value'
import { Maybe } from '~shared/types/generic'

import { Palette } from '../../css/colors'
import { valueDeleteFx, valueUpdateFx } from '../../events/values'

const lastExecution = {
  time: Date.now()
}

const emptyToUndefined = (str: string) => (/^\s*$/.test(str) ? undefined : str)

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

export const TextInput = styled.input`
  &.invalid {
    background-color: ${Palette.error};
  }
`

export const useEditorTools = (
  node: Node,
  value: Value | undefined,
  tag: string,
  validator: ZodSchema<any>
) => {
  const views = useView(Views)
  const [error, setError] = useState<Maybe<ZodError>>()

  const saveFn = (e: SyntheticEvent<HTMLInputElement>) => {
    const now = Date.now()
    // make sure that onBlur and onKeyDown don't run this twice
    if (now - lastExecution.time < 20) {
      return
    } else {
      lastExecution.time = now
    }
    setError(undefined)
    const newValue = emptyToUndefined(e.currentTarget.value)
    const result = validator.safeParse(newValue)
    if (value?.value === newValue && result.success) {
      return views.displayView()
    }
    if (result.success) {
      const params = {
        tag,
        nodeId: node.id,
        nodeType: NodeType.String
      }
      void (
        newValue !== undefined
          ? valueUpdateFx({ ...params, value: newValue } as StringValue)
          : valueDeleteFx(params)
      ).then(views.displayView)
    } else {
      e.preventDefault()
      e.stopPropagation()
      setError(result.error)
    }
  }

  const keyMap = cond([
    [propEq('code', 'ArrowRight'), when(views.isEditView, (e: Event) => e.stopPropagation())],
    [propEq('code', 'ArrowLeft'), when(views.isEditView, (e: Event) => e.stopPropagation())],
    [propSatisfies(included(['ArrowUp', 'ArrowDown', 'Tab']), 'code'), saveFn]
  ])

  return {
    saveFn,
    keyMap,
    error,
    views
  }
}

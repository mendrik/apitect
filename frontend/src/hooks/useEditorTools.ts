import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { ZodError, ZodSchema } from 'zod'
import { useView } from '~hooks/useView'
import { Node } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { Maybe } from '~shared/types/generic'

import { valueDeleteFx, valueUpdateFx } from '../events/values'

const emptyToUndefined = <T extends Value['value'] | undefined>(str: T): T | undefined =>
  typeof str === 'string' && /^\s*$/.test(str) ? undefined : (str as T)

export enum Views {
  Display,
  Edit
}

export const Text = styled.div`
  max-width: 100%;
  width: 100%;
  height: 24px;
  padding-left: 3px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const useEditorTools = (
  node: Node,
  value: Value | undefined,
  tag: string,
  validator: ZodSchema<any>
) => {
  const views = useView(Views)
  const [error, setError] = useState<Maybe<ZodError>>()

  const saveValue = <T extends Value['value']>(formValue: T | undefined) => {
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
      setError(result.error)
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const result = validator.safeParse(e.currentTarget.value)
    setError(result.success ? undefined : result.error)
  }

  return {
    saveValue,
    onChange,
    error,
    setError,
    views
  }
}

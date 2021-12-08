import { SyntheticEvent, useState } from 'react'
import { ZodAny, ZodError, ZodSchema } from 'zod'
import { Node } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { StringValue } from '~shared/types/domain/values/stringValue'
import { Value } from '~shared/types/domain/values/value'
import { Fn, Maybe } from '~shared/types/generic'

import { valueDeleteFx, valueUpdateFx } from '../../events/values'

const lastExecution = {
  time: Date.now()
}

const emptyToUndefined = (str: string) => (/^\s*$/.test(str) ? undefined : str)

export const useSafeAttempt =
  (node: Node, value: Value | undefined, tag: string, validator: ZodSchema<any>, displayView: Fn) =>
  (e: SyntheticEvent<HTMLInputElement>) => {
    const [, setError] = useState<Maybe<ZodError>>()

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
      return displayView()
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
      ).then(displayView)
    } else {
      e.preventDefault()
      e.stopPropagation()
      setError(result.error)
    }
  }

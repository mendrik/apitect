import {
  complement,
  cond,
  converge,
  either,
  isEmpty,
  pathEq,
  pathOr,
  pipe,
  propEq,
  propOr,
  propSatisfies,
  test
} from 'ramda'
import { included } from 'ramda-adjunct'
import { KeyboardEvent } from 'react'
import { Fn } from '~shared/types/generic'
import { insertStr, removeCharAt, removeCharBefore } from '~shared/utils/ramda'

import { stopEvent } from './stopPropagation'

const validNumber = test(/^-?[1-9]\d*[,.]?\d*$/)

export const codeIn = (...keys: string[]) => propSatisfies(included(keys), 'code')
export const keyIn = (...keys: string[]) => propSatisfies(included(keys), 'key')
export const withShift: Fn<boolean> = propEq('shiftKey', true)
export const spaceOrEnter = either(codeIn('Space'), keyIn('Enter'))

export const target = {
  value: pathOr('', ['target', 'value']),
  valueIs: <T>(val: T) => pathEq(['target', 'value'], val),
  caretPosition: pathOr(0, ['target', 'selectionStart'])
}

export const futureValue: (ev: KeyboardEvent<HTMLInputElement>) => string = cond([
  [
    pathEq(['key', 'length'], 1),
    converge(insertStr as any, [target.caretPosition, propOr('', 'key'), target.value])
  ],
  [codeIn('Backspace'), converge(removeCharBefore as any, [target.caretPosition, target.value])],
  [codeIn('Delete'), converge(removeCharAt as any, [target.caretPosition, target.value])]
])

export const onlyNumbers = cond([
  [pipe<any, any, any>(futureValue, isEmpty), e => void e],
  [pipe<any, any, any>(futureValue, complement(validNumber)), stopEvent()]
])

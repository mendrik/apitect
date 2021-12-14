import {
  always,
  both,
  complement,
  cond,
  converge,
  either,
  isEmpty,
  path,
  pathEq,
  pathOr,
  pipe,
  propEq,
  propOr,
  propSatisfies,
  test
} from 'ramda'
import { included, isTruthy } from 'ramda-adjunct'
import { KeyboardEvent } from 'react'
import { Fn } from '~shared/types/generic'
import { insertStr, removeCharAt, removeCharBefore, removeSlice } from '~shared/utils/ramda'

import { stopEvent } from './stopPropagation'

const validNumber = test(/^-?[1-9]\d*[,.]?\d*$/)

export const codeIn = (...keys: string[]) => propSatisfies(included(keys), 'code')
export const keyIn = (...keys: string[]) => propSatisfies(included(keys), 'key')
export const withShift: Fn<boolean> = propEq('shiftKey', true)
export const withCtrl: Fn<boolean> = propEq('ctrlKey', true)
export const spaceOrEnter = either(codeIn('Space'), keyIn('Enter'))

export const target = {
  value: pathOr('', ['target', 'value']),
  valueIs: <T>(val: T) => pathEq(['target', 'value'], val),
  caretPosition: pathOr(0, ['target', 'selectionStart']),
  selectionEnd: pathOr(0, ['target', 'selectionEnd']),
  hasSelection: pipe(path(['target', 'selectionEnd']), isTruthy)
}

/**
 * Util function that predicts what the target.value will be after keyUp but during keyDown
 */
export const futureValue: (ev: KeyboardEvent<HTMLInputElement>) => string = cond([
  [
    pathEq(['key', 'length'], 1),
    converge(insertStr as any, [target.caretPosition, propOr('', 'key'), target.value])
  ],
  [both(withCtrl, codeIn('Delete', 'Backspace')), always('')],
  [
    target.hasSelection,
    converge(removeSlice as any, [target.caretPosition, target.selectionEnd, target.value])
  ],
  [codeIn('Backspace'), converge(removeCharBefore as any, [target.caretPosition, target.value])],
  [codeIn('Delete'), converge(removeCharAt as any, [target.caretPosition, target.value])]
])

const noOp = (e: KeyboardEvent<HTMLInputElement>) => void 0

export const onlyNumbers = cond([
  [either(withShift, withCtrl), noOp],
  [pipe<any, any, any>(futureValue, isEmpty), noOp],
  [pipe<any, any, any>(futureValue, complement(validNumber)), stopEvent()]
])

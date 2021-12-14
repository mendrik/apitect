import {
  always,
  anyPass,
  both,
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
  T,
  test
} from 'ramda'
import { included, notEqual } from 'ramda-adjunct'
import { ClipboardEvent, KeyboardEvent } from 'react'
import { Fn } from '~shared/types/generic'
import { insertStr, removeCharAt, removeCharBefore, removeSlice } from '~shared/utils/ramda'

import { stopEvent, stopPropagation } from './stopPropagation'

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
  hasSelection: converge<any, boolean, number, number>(notEqual as any, [
    pathOr(0, ['target', 'selectionStart']),
    pathOr(0, ['target', 'selectionEnd'])
  ])
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
  [codeIn('Delete'), converge(removeCharAt as any, [target.caretPosition, target.value])],
  [T, target.value]
])

const noOp = (_e: KeyboardEvent<HTMLInputElement>) => void 0

export const onlyNumbers = cond([
  [anyPass([withShift, withCtrl, codeIn('ArrowLeft', 'ArrowRight')]), stopPropagation()],
  [pipe<any, any, any>(futureValue, isEmpty), noOp],
  [pipe<any, any, any>(futureValue, complement(validNumber)), stopEvent()]
])

export const onlyNumbersPaste = (e: ClipboardEvent<HTMLInputElement>) => {
  const data = e.clipboardData?.getData('Text')
  if (data && !validNumber(data)) {
    e.preventDefault()
  }
}

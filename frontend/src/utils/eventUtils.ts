import {
  allPass,
  always,
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
  test,
  unless
} from 'ramda'
import { included, isNotNil, notEqual } from 'ramda-adjunct'
import { ClipboardEvent, KeyboardEvent } from 'react'
import { Fn } from '~shared/types/generic'
import {
  insertStr,
  removeCharAt,
  removeCharBefore,
  removeSlice,
  replaceSlice
} from '~shared/utils/ramda'

import { stopEvent, stopPropagation } from './stopPropagation'

export const validNumber = test(/^-?[0-9]\d*[,.]?\d*$/)

export const codeIn = (...keys: string[]) => propSatisfies(included(keys), 'code')
export const keyIn = (...keys: string[]) => propSatisfies(included(keys), 'key')
export const withShift: Fn<boolean> = propEq('shiftKey', true)
export const withCtrl: Fn<boolean> = both(
  propEq<string>('ctrlKey', true),
  propEq<string>('shiftKey', false)
)
export const withoutModkey: Fn<boolean> = both(
  propEq<string>('ctrlKey', false),
  propEq<string>('shiftKey', false)
)
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
    both(target.hasSelection, codeIn('Delete', 'Backspace')),
    converge(removeSlice as any, [target.caretPosition, target.selectionEnd, target.value])
  ],
  [target.hasSelection, target.value],
  [
    pathEq(['key', 'length'], 1),
    converge(insertStr as any, [target.caretPosition, propOr('', 'key'), target.value])
  ],
  [both(withCtrl, codeIn('Delete', 'Backspace')), always('')],
  [codeIn('Backspace'), converge(removeCharBefore as any, [target.caretPosition, target.value])],
  [codeIn('Delete'), converge(removeCharAt as any, [target.caretPosition, target.value])],
  [T, target.value]
])

const noOp = (_e: KeyboardEvent<HTMLInputElement>) => void 0

export const onlyNumbers = cond([
  [allPass([withShift, withCtrl, codeIn('ArrowLeft', 'ArrowRight')]), stopPropagation()],
  [pipe<any, any, any>(futureValue, isEmpty), noOp],
  [either(withCtrl, withShift), noOp],
  [pipe<any, any, any>(futureValue, complement(validNumber)), stopEvent()]
])

const clipboard = (e: ClipboardEvent<HTMLInputElement>) => e.clipboardData?.getData('Text')

export const futurePasteResult: (ev: ClipboardEvent<HTMLInputElement>) => string = cond([
  [
    both(target.hasSelection, pipe<any, any, boolean>(clipboard, isNotNil)),
    converge(replaceSlice as any, [
      target.caretPosition,
      target.selectionEnd,
      clipboard,
      target.value
    ])
  ],
  [T, converge(insertStr as any, [target.caretPosition, clipboard, target.value])]
])

export const onlyNumbersPaste = unless(pipe(futurePasteResult, validNumber), stopEvent())

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
import { ClipboardEvent, KeyboardEvent, SyntheticEvent } from 'react'
import { ArgFn, Fn } from '~shared/types/generic'
import {
  insertStr,
  removeCharAt,
  removeCharBefore,
  removeSlice,
  replaceSlice
} from '~shared/utils/ramda'

import { stopEvent, stopPropagation } from './events'

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

/** Collection of often used event.target related operations **/
export const target = {
  value: pathOr('', ['target', 'value']),
  valueIs: <T>(val: T) => pathEq(['target', 'value'], val),
  caretPosition: pathOr(0, ['target', 'selectionStart']),
  selectionEnd: pathOr(0, ['target', 'selectionEnd']),
  hasSelection: converge(
    (x: number, y: number) => notEqual(x, y),
    [pathOr(0, ['target', 'selectionStart']), pathOr(0, ['target', 'selectionEnd'])]
  ),
  focus: <E extends SyntheticEvent | Event>(ev: E) => (ev.target as HTMLElement)?.focus()
}

/**
 * Util function that predicts what the 'target.value' will be after keyUp but during keyDown
 */
export const futureValue: (ev: KeyboardEvent<HTMLInputElement>) => string = cond([
  [
    both(target.hasSelection, codeIn('Delete', 'Backspace')),
    converge(removeSlice, [target.caretPosition, target.selectionEnd, target.value])
  ],
  [target.hasSelection, target.value],
  [
    pathEq(['key', 'length'], 1),
    converge(insertStr, [target.caretPosition, propOr('', 'key'), target.value])
  ],
  [both(withCtrl, codeIn('Delete', 'Backspace')), always('')],
  [codeIn('Backspace'), converge(removeCharBefore, [target.caretPosition, target.value])],
  [codeIn('Delete'), converge(removeCharAt, [target.caretPosition, target.value])],
  [T, target.value]
])

type KEvent = KeyboardEvent<HTMLInputElement>

const noOp = (_e: KEvent) => void 0

/** reject non-digit characters **/
export const onlyNumbers = cond<[KEvent], void>([
  [allPass([withShift, withCtrl, codeIn('ArrowLeft', 'ArrowRight')]), stopPropagation],
  [pipe(futureValue, isEmpty), noOp],
  [either(withCtrl, withShift), noOp],
  [pipe(futureValue, complement(validNumber)), stopEvent]
])

const clipboard = (e: ClipboardEvent<HTMLInputElement>) => e.clipboardData?.getData('Text')

export const futurePasteResult = cond<[ClipboardEvent<HTMLInputElement>], string>([
  [
    both(target.hasSelection, pipe(clipboard, isNotNil)),
    converge(replaceSlice, [target.caretPosition, target.selectionEnd, clipboard, target.value])
  ],
  [T, converge(insertStr, [target.caretPosition, clipboard, target.value])]
])

export const onlyNumbersPaste = unless(pipe(futurePasteResult, validNumber), stopEvent)

export const whenDefined =
  <T>(obj: T, fn: ArgFn<NonNullable<T>>) =>
  () => {
    if (isNotNil(obj)) {
      fn(obj as NonNullable<T>)
    }
  }

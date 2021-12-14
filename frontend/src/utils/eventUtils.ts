import { complement, cond, either, pathEq, pathOr, pipe, propEq, propSatisfies, test } from 'ramda'
import { included } from 'ramda-adjunct'
import { Fn } from '~shared/types/generic'

import { stopEvent } from './stopPropagation'

const validNumber = test(/^-?[1-9]\d*[,.]?\d*$/)

export const codeIn = (...keys: string[]) => propSatisfies(included(keys), 'code')
export const keyIn = (...keys: string[]) => propSatisfies(included(keys), 'key')
export const withShift: Fn<boolean> = propEq('shiftKey', true)
export const spaceOrEnter = either(codeIn('Space'), keyIn('Enter'))

export const target = {
  value: pathOr('', ['target', 'value']),
  valueIs: <T>(val: T) => pathEq(['target', 'value'], val)
}

export const onlyNumbers = cond([[pipe(target.value, complement(validNumber)), stopEvent()]])

import { always, any, append, flatten, ifElse, join, pipe, zip } from 'ramda'
import { isFalsy } from 'ramda-adjunct'

// prettier-ignore
export const withoutBlanks = (strings: TemplateStringsArray, ...args: any[]): string | null =>
  ifElse(
    any(isFalsy),
    always(null),
    pipe(append(''), zip(strings), flatten, join(''))
  )(args)

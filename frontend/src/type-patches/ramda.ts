import * as ramda from 'ramda'

declare module 'ramda' {
  export function nthArg(n: 0): <T extends any[]>(...args: T) => T[0]
  export function nthArg(n: 1): <T extends any[]>(...args: T) => T[1]
  export function nthArg(n: 2): <T extends any[]>(...args: T) => T[2]
  export function nthArg(n: 3): <T extends any[]>(...args: T) => T[3]
}

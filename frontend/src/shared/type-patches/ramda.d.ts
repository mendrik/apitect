/* eslint-disable unused-imports/no-unused-imports */
// noinspection ES6UnusedImports
import * as ramda from 'ramda'

declare module 'ramda' {
  export function nthArg(n: 0): <T extends any[]>(...args: T) => T[0]
  export function nthArg(n: 1): <T extends any[]>(...args: T) => T[1]
  export function nthArg(n: 2): <T extends any[]>(...args: T) => T[2]
  export function nthArg(n: 3): <T extends any[]>(...args: T) => T[3]

  export function prop<O extends Record<string, any>, K1 extends keyof O>(
    name: K1
  ): <O2 extends O, K2 extends typeof name>(obj: O2) => NonNullable<O2[K2 & K1]>
}

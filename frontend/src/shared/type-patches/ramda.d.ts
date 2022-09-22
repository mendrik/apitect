/* eslint-disable unused-imports/no-unused-imports */
// noinspection ES6UnusedImports
import * as ramda from 'ramda'

declare module 'ramda' {
  export function nthArg(n: 0): <T extends any[]>(...args: T) => T[0]
  export function nthArg(n: 1): <T extends any[]>(...args: T) => T[1]
  export function nthArg(n: 2): <T extends any[]>(...args: T) => T[2]
  export function nthArg(n: 3): <T extends any[]>(...args: T) => T[3]

  export function prop<O extends object>(
    name: keyof O
  ): (obj: O) => O[typeof name] extends infer R ? (R extends undefined ? never : R) : never
}

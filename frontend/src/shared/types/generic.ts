import { Dispatch, PropsWithChildren, SetStateAction } from 'react'

export type Fn<R = void> = (...args: any[]) => R
export type ArgFn<A, R = void> = (arg: A) => R

export type Milliseconds = number
export type Seconds = number
export type Fr = number
export type Pixels = number

export type Maybe<T> = T | undefined | null

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

export type Jsx<T = {}> = PropsWithChildren<T>

export type UnionToIntersection<U> = (U extends never ? never : (arg: U) => never) extends (
  arg: infer I
) => void
  ? I
  : never

export type UnionToTuple<T> = UnionToIntersection<T extends never ? never : (t: T) => T> extends (
  _: never
) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : []

export type NonEmptyArray<T> = [T, ...T[]]

export type UseState<T> = [T, Dispatch<SetStateAction<T>>]

export type Primitives = string | number | boolean | null | undefined

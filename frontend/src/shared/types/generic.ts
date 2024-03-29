import { Dictionary } from 'ramda'
import { Dispatch, PropsWithChildren, SetStateAction, SyntheticEvent } from 'react'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'

export type Fn<R = void> = (...args: any[]) => R
export type ArgFn<A, R = void> = (arg: A) => R
export type ArgsFn<A extends any[], R = void> = (...args: A) => R

export type Milliseconds = number
export type Seconds = number
export type Fr = number
export type Pixels = number
export type Width = number
export type Index = number

export type OptNode = TreeNode<Node> | null

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

export type Unboxed<T> = T extends (infer U)[] ? U : T

export type Json = string | number | boolean | null | Json[] | Dictionary<Json>

export type InputEvent = SyntheticEvent<HTMLInputElement, Event> & { target: HTMLInputElement }

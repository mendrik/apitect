export type Fn<R = void> = (...args: any[]) => R

export type Milliseconds = number
export type Fr = number
export type Pixels = number

export type Maybe<T> = T | undefined | null

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

import type { TypeOfSource, Store } from 'effector'

export type TypeOfSources<T extends Store<any>[]> = { [K in keyof T]: TypeOfSource<T[K]> }

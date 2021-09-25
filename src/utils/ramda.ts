import { complement, compose, head, join, juxt, propEq, tail, toUpper } from 'ramda'

export const propNotEq: any = complement(propEq as any)

export const capitalize = compose(join(''), juxt([compose(toUpper, head), tail]))

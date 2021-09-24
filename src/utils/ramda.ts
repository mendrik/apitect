import { complement, propEq } from 'ramda'

export const propNotEq: any = complement(propEq as any)

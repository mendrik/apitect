import { compose, head, join, juxt, tail, toUpper } from 'ramda'

export const capitalize = compose(join(''), juxt([compose(toUpper, head), tail]))
